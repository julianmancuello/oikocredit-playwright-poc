@regression
Feature: Orders in MyOikocredit

  Background:
    Given the user logs into MYOIKOCREDIT LTP with valid credentials
  @debug
  Scenario: E2E - Investor Portal - Purchase Order
    When the user creates a "Purchase" order
    And the ISO logs into TITAN LTP with valid credentials
    And the ISO approves the "Purchase" order