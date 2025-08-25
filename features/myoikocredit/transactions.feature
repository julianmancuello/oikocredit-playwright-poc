@regression
Feature: MyOikocredit - Investor Portal - Transactions
  @debug
  Scenario Outline: Validate Transaction Details - <AccountType>
    Given the user logs into MYOIKOCREDIT LTP as <AccountType> with valid credentials
    When the user navigates from "Home Page - MOC" to "Transaction Page - MOC"
    Then the user checks the visibility of the "Transaction Page - MOC" details

    Examples:
      | AccountType |
      | individual  |
      | joint       |