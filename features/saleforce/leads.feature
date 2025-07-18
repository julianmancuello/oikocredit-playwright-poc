Feature: Leads

  Scenario: Create a new lead
    Given I am on the leads page
    When I click the "New" button
    And I fill in the lead form and save it
    Then I should see the success message
    And the new lead should appear in the leads list