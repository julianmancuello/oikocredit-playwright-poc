@regression
Feature: MyOikocredit - Investor Portal - Transactions
  @debug
  Scenario: Validate Transaction Details - <TransactionType>
    Given the user logs into MYOIKOCREDIT LTP with valid credentials
    When the user goes to Transaction Page
    Then the user checks the visibility of the "Transaction Page - MOC" details