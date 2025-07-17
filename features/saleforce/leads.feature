Feature: Leads

  Scenario: Create a new lead
    Given I am on the leads page
    When I click the "New" button
    And I fill in the lead form
    #And I click the Save button
    #Then I should see a confirmation message "Lead saved successfully"
    #And the new lead should appear in the leads list