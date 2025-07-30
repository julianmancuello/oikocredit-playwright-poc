@regression
Feature: Login to Salesforce

  @smoke
  Scenario: User logs in with valid credentials
    Given the ISO is on the "SALESFORCE" "LTP" login page
    When the ISO logs in with "LTP" valid credentials
    Then the ISO should see the Home page