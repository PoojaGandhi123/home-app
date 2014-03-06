package edu.weber.housing1000.Questions;

import android.content.Context;
import android.content.DialogInterface;
import android.opengl.Visibility;
import android.text.Editable;
import android.text.InputType;
import android.text.TextWatcher;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.Spinner;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.ArrayList;

/**
 * Created by Blake on 11/29/13.
 */
public abstract class Question {

    @Expose
    @SerializedName("QuestionId")
    private int questionId;

    @Expose
    @SerializedName("text")
    private String text;

    @Expose
    @SerializedName("QuestionType")
    private String questionType;

    @Expose
    @SerializedName("Options")
    private String options;

    @Expose
    @SerializedName("OrderId")
    private int orderId;

    @Expose
    @SerializedName("ParentQuestionId")
    private int parentQuestionId;

    @Expose
    @SerializedName("ParentRequiredAnswer")
    private String parentRequiredAnswer;

    private String group = "";
    private ArrayList<Question> dependents;

    protected View myView;

    // Getters and Setters
    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public View getView()
    {
        return myView;
    }

    public void setView(View v)
    {
        myView = v;
    }

    public int getParentQuestionId()
    {
        return parentQuestionId;
    }

    public void setParentQuestionId(int parentQuestionId)
    {
        this.parentQuestionId = parentQuestionId;
    }

    public String getParentRequiredAnswer()
    {
        return parentRequiredAnswer;
    }

    public void setParentRequiredAnswer(String parentRequiredAnswer)
    {
        this.parentRequiredAnswer = parentRequiredAnswer;
    }

    public ArrayList<Question> getDependents()
    {
        return dependents;
    }

    // Default constructor
    public Question() {
        dependents = new ArrayList<Question>();
    }

    public void addDependent(Question dependent)
    {
        dependents.add(dependent);
    }

    public void hookUpDependents()
    {
        LinearLayout myLayout = (LinearLayout) getView();

        for (final Question question : dependents)
        {
            // Add an on click listener to the parent's main layout
            View.OnClickListener onClickListener = new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Log.d("TOUCHED", "TOUCHED");
                    toggleVisibility(question, null);
                }
            };

            myLayout.setOnClickListener(onClickListener);

            // Add a listener to all child views, too
            if (myLayout.getChildCount() > 0)
            {
                for (int i = 0; i < myLayout.getChildCount(); i++)
                {
                    View child = myLayout.getChildAt(i);

                    if (child instanceof Spinner)
                    {
                        Spinner spinner = (Spinner) child;
                        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                            @Override
                            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                                toggleVisibility(question, null);
                            }

                            @Override
                            public void onNothingSelected(AdapterView<?> parent) {
                                toggleVisibility(question, null);
                            }
                        });

                    }
                    else if (child instanceof EditText)
                    {
                        EditText editText = (EditText) child;
                        editText.addTextChangedListener(new TextWatcher() {
                            @Override
                            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

                            }

                            @Override
                            public void onTextChanged(CharSequence s, int start, int before, int count) {
                                toggleVisibility(question, null);
                            }

                            @Override
                            public void afterTextChanged(Editable s) {

                            }
                        });
                    }
                    else
                    {
                        child.setOnClickListener(onClickListener);
                    }
                }
            }

            toggleVisibility(question, null);
        }
    }

    private void toggleVisibility(Question question, Question parent)
    {
        final LinearLayout questionLayout = (LinearLayout) question.getView();
        if (parent == null)
        {
            parent = this;
        }

        if (parent.getQuestionType().equals("SinglelineTextBox"))
        {
            //Make dependent questions visible if EditText is not blank
            if (!parent.getAnswer().equals(""))
            {
                questionLayout.setVisibility(View.VISIBLE);
            }
            else
            {
                questionLayout.setVisibility(View.GONE);
                question.clearAnswer();
            }
        } else if (parent.getQuestionType().equals("MultiSelect"))
        {
            LinearLayout parentLayout = (LinearLayout) parent.getView();
            for (int k = 0; k < parentLayout.getChildCount(); k++)
            {
                View child = parentLayout.getChildAt(k);
                //Make dependent questions visible if the required parent answer is checked
                if (child instanceof CheckBox)
                {
                    if (((CheckBox) child).isChecked() && ((CheckBox) child).getText().toString().toLowerCase().equals(question.getParentRequiredAnswer().toLowerCase()))
                    {
                        questionLayout.setVisibility(View.VISIBLE);
                        return;
                    } else
                    {
                        questionLayout.setVisibility(View.GONE);
                        question.clearAnswer();
                    }
                }

            }
            /*
            //Make dependent questions visible if question answer contains the required answer
            if (!parent.getAnswer().toLowerCase().equals("") && question.getParentRequiredAnswer().toLowerCase().contains(parent.getAnswer().toLowerCase()))
            {
                questionLayout.setVisibility(View.VISIBLE);
            }
            else
            {
                questionLayout.setVisibility(View.GONE);
                question.clearAnswer();
            }*/
        } else
        {
            if (question.getParentRequiredAnswer().toLowerCase().equals(parent.getAnswer().toLowerCase()))
            {
                questionLayout.setVisibility(View.VISIBLE);
            }
            else
            {
                questionLayout.setVisibility(View.GONE);
                question.clearAnswer();
            }
        }

        for (Question childQuestion : question.getDependents())
        {
            toggleVisibility(childQuestion, question);
        }
    }

    // Abstract classes
    public abstract View createView(Context context);
    public abstract String getAnswer();
    public abstract void setAnswer(String answer);
    public abstract void clearAnswer();

}