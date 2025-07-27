Feature: Leads

  Background:
    Given the ISO is on the "LTP" leads page

  Scenario: Create a new lead
    When the ISO clicks the New lead button
    And the ISO fills in the lead form and saves it
    Then the ISO should see the created lead success message
    And the ISO should see the new lead in the leads list
  
  Scenario: Edit a lead
    When the ISO selects an existing lead
    And the ISO updates the Mobile field with a random mobile number
    Then the ISO should see the saved lead success message
    And the ISO should see the new mobile number in the lead details
  
  Scenario: Convert a lead
    When the ISO selects an existing lead
    And the ISO converts the lead to a "Prospect Individual"
    Then the ISO should see the lead conversion success message
    And the "Prospect Individual" account should have a status of "Pending Signup"