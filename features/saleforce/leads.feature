Feature: Leads

  Scenario: Create a new lead
    Given the ISO is on the leads page
    When the ISO clicks the New lead button
    And the ISO fills in the lead form and saves it
    Then the ISO should see the created lead success message
    And the ISO should see the new lead in the leads list
  
  Scenario: Edit a lead
    Given the ISO is on the leads page
    When the ISO selects an existing lead
    And the ISO updates the Mobile field with a random mobile number
    Then the ISO should see the saved lead success message
    And the ISO should see the new mobile number in the lead details