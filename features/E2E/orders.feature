@regression
Feature: E2E - Orders in MyOikocredit Investor Portal
  
  Scenario Outline: E2E - Order Flow - <TransactionType>
    Given the user logs into MYOIKOCREDIT LTP as individual with valid credentials
    When the user creates a <TransactionType> order
    And the ISO logs into TITAN LTP with valid credentials
    And the ISO approves the <TransactionType> order
    And the ISO logs into SALESFORCE LTP with valid credentials
    And the ISO searches for the LTP investor 
    And the ISO checks that the <TransactionType> order appears in the emails
    And the user logs into MYOIKOCREDIT LTP with valid credentials
    Then the user checks that the <TransactionType> order appears approved in the transactions
  
    Examples:
      | TransactionType |
      | Purchase        |
      | Redemption      |