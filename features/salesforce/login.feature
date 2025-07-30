@regression
Feature: Login to Salesforce

  Background:
    Given the ISO is on the "SALESFORCE" "LTP" login page

  @smoke
  Scenario: User logs in with valid credentials
    When the ISO logs in with "LTP" valid credentials
    Then the ISO should see the Home page

  Scenario: The user attempts to log in with invalid credentials
    When the ISO attempts to log in with invalid credentials
    Then the ISO should see an error message