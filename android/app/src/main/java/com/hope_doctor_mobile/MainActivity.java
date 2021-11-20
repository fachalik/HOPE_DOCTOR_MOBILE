package com.hope_doctor_mobile;

import android.os.Bundle; // here 
// react-native-splash-screen >= 0.3.1 
import org.devio.rn.splashscreen.SplashScreen; // here 
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    SplashScreen.show(this);  // here 
    return "HOPE_DOCTOR_MOBILE";
  }
}
