package com.weather;
import android.os.Bundle; // 配置SplashScreen
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // 配置SplashScreen
public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "weather";
  }

 @Override
 protected void onCreate(Bundle savedInstanceState) {
   SplashScreen.show(this);  // 配置SplashScreen
   super.onCreate(savedInstanceState);
 }
}
