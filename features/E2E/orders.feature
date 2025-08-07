@regression
Feature: Orders in MyOikocredit

  Background:
    Given the ISO logs into "MYOIKOCREDIT" "LTP" with valid credentials
  @debug
  Scenario: E2E - Investor Portal - Purchase Order
    When the client creates a "Purchase" order