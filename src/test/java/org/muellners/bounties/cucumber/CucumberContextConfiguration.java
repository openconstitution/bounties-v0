package org.muellners.bounties.cucumber;

import io.cucumber.java.Before;
import org.muellners.bounties.BountiesApp;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

@SpringBootTest
@WebAppConfiguration
@ContextConfiguration(classes = BountiesApp.class)
public class CucumberContextConfiguration {

  @Before
  public void setup_cucumber_spring_context() {
    // Dummy method so cucumber will recognize this class as glue
    // and use its context configuration.
  }
}
