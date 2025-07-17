Feature: Login to Saleforce

  Scenario: User logs in with valid credentials
    Given I am on the login page
    When I log in with username "jmancuello@oikocredit.org.ltp" and password "Nina23!!"
    Then I should see the Home page