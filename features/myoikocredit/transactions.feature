@regression
Feature: MyOikocredit - Investor Portal - Transactions
  @debug
  Scenario Outline: Validate Transaction Details - <AccountType>
    Given the user logs into MYOIKOCREDIT LTP as <AccountType> with valid credentials
    When the user navigates from "Home Page - MOC" to "Transactions Page - MOC"
    Then the user checks the visibility of the "Transactions Page - MOC" details

    Examples:
      | AccountType |
      | individual  |
      | joint       |