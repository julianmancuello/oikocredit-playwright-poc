@regression
Feature: Orders in MyOikocredit

  Background:
    Given the ISO logs into "MYOIKOCREDIT" "LTP" with valid credentials

  Scenario: E2E - Investor Portal - Purchase Order
    Then the ISO should see the Home page