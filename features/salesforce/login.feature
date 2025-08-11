@regression
Feature: Login to Salesforce

  @smoke
  Scenario: User logs in with valid credentials
    Given the ISO logs into SALESFORCE LTP with valid credentials
    Then the ISO should see the Home page

  Scenario: The user attempts to log in with invalid credentials
    Given the ISO is on the SALESFORCE LTP login page
    When the ISO attempts to log in with invalid credentials
    Then the ISO should see an error message