package edu.weber.housing1000.Helpers;

import android.graphics.*;

/**
 * Created by Coty on 11/26/13.
 */
public class ImageHelper {
    public static Bitmap ScaleImage(Bitmap bitmap)
    {
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();
        int newWidth = 200;
        int newHeight = 120;

        float scaleWidth = ((float) newWidth) / width;
        float scaleHeight = ((float) newHeight) / height;

        Matrix matrix = new Matrix();

        if(scaleWidth>scaleHeight)
            matrix.postScale(scaleHeight, scaleHeight);
        else if(scaleHeight>scaleWidth)
            matrix.postScale(scaleWidth, scaleWidth);
        else
            matrix.postScale(scaleWidth, scaleHeight);

        Bitmap resizedBitmap = Bitmap.createBitmap(bitmap,0,0,width,height,matrix,true);
        return resizedBitmap;
    }
}