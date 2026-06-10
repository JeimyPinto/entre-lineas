#!/bin/bash

# 🧪 NextAuth Migration - Automated Tests with curl
# Usage: ./test-api.sh [base_url] [test_case]
# Example: ./test-api.sh http://localhost:3000 signup

BASE_URL="${1:-http://localhost:3000}"
TEST_CASE="${2:-all}"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counters
PASSED=0
FAILED=0

# Helper functions
print_test() {
  echo -e "${BLUE}Testing: $1${NC}"
}

print_success() {
  echo -e "${GREEN}✓ PASS${NC}: $1"
  ((PASSED++))
}

print_failure() {
  echo -e "${RED}✗ FAIL${NC}: $1"
  ((FAILED++))
}

print_section() {
  echo -e "\n${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${YELLOW}$1${NC}"
  echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# Test 1: Signup
test_signup() {
  print_test "Signup - Create new user"
  
  response=$(curl -s -X POST "$BASE_URL/api/auth/signup" \
    -H "Content-Type: application/json" \
    -d '{
      "email": "testuser'$(date +%s)'@example.com",
      "password": "TestPassword123",
      "name": "Test User"
    }')
  
  if echo "$response" | grep -q '"success":true'; then
    print_success "User created successfully"
    # Extract user ID for later tests
    USER_ID=$(echo "$response" | grep -o '"id":"[^"]*' | head -1 | cut -d'"' -f4)
    USER_EMAIL=$(echo "$response" | grep -o '"email":"[^"]*' | head -1 | cut -d'"' -f4)
    export USER_ID USER_EMAIL
    return 0
  else
    print_failure "Signup failed: $response"
    return 1
  fi
}

# Test 2: Password Reset - Request
test_password_reset_request() {
  print_test "Password Reset - Request token"
  
  if [ -z "$USER_EMAIL" ]; then
    print_failure "USER_EMAIL not set - run signup first"
    return 1
  fi
  
  response=$(curl -s -X POST "$BASE_URL/api/admin/password/reset" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$USER_EMAIL\"}")
  
  if echo "$response" | grep -q '"success":true'; then
    print_success "Reset token requested"
    # Extract token for later tests
    RESET_TOKEN=$(echo "$response" | grep -o '"token":"[^"]*' | head -1 | cut -d'"' -f4)
    export RESET_TOKEN
    return 0
  else
    print_failure "Reset request failed: $response"
    return 1
  fi
}

# Test 3: Password Reset - Confirm
test_password_reset_confirm() {
  print_test "Password Reset - Confirm new password"
  
  if [ -z "$RESET_TOKEN" ]; then
    print_failure "RESET_TOKEN not set - run reset_request first"
    return 1
  fi
  
  response=$(curl -s -X POST "$BASE_URL/api/admin/password/confirm" \
    -H "Content-Type: application/json" \
    -d "{\"token\":\"$RESET_TOKEN\",\"password\":\"NewPassword123\"}")
  
  if echo "$response" | grep -q '"success":true'; then
    print_success "Password reset confirmed"
    return 0
  else
    print_failure "Reset confirm failed: $response"
    return 1
  fi
}

# Test 4: Invalid Login (old password)
test_login_invalid() {
  print_test "Login - Attempt with old password (should fail)"
  
  if [ -z "$USER_EMAIL" ]; then
    print_failure "USER_EMAIL not set"
    return 1
  fi
  
  response=$(curl -s -X POST "$BASE_URL/api/auth/callback/credentials" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$USER_EMAIL\",\"password\":\"TestPassword123\"}" \
    -w "\n%{http_code}")
  
  http_code=$(echo "$response" | tail -n1)
  
  if [ "$http_code" = "401" ] || echo "$response" | grep -q "error"; then
    print_success "Login correctly rejected with old password"
    return 0
  else
    print_failure "Login should have failed with old password"
    return 1
  fi
}

# Test 5: Valid Login (new password)
test_login_valid() {
  print_test "Login - Attempt with new password (should succeed)"
  
  if [ -z "$USER_EMAIL" ]; then
    print_failure "USER_EMAIL not set"
    return 1
  fi
  
  # This would set a session cookie, but curl doesn't persist cookies by default
  # In a real scenario, you'd use curl with -c to save cookies
  response=$(curl -s -X POST "$BASE_URL/api/auth/callback/credentials" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$USER_EMAIL\",\"password\":\"NewPassword123\"}")
  
  if echo "$response" | grep -q "ok"; then
    print_success "Login successful with new password"
    return 0
  else
    print_failure "Login with new password failed: $response"
    return 1
  fi
}

# Test 6: List Users (requires auth)
test_list_users() {
  print_test "Admin - List users"
  
  response=$(curl -s -X GET "$BASE_URL/api/admin/users" \
    -H "Content-Type: application/json")
  
  if echo "$response" | grep -q '"users"'; then
    print_success "Users list retrieved"
    return 0
  else
    print_failure "Failed to list users: $response"
    return 1
  fi
}

# Main test runner
run_all_tests() {
  print_section "🚀 NextAuth Migration - Automated Tests"
  echo "Base URL: $BASE_URL"
  echo "Tests will be executed in sequence..."
  
  test_signup && \
  test_password_reset_request && \
  test_password_reset_confirm && \
  test_login_invalid && \
  test_login_valid && \
  test_list_users
  
  print_section "📊 Test Results"
  echo -e "Passed: ${GREEN}$PASSED${NC}"
  echo -e "Failed: ${RED}$FAILED${NC}"
  echo -e "Total:  $((PASSED + FAILED))"
  
  if [ $FAILED -eq 0 ]; then
    echo -e "\n${GREEN}✓ All tests passed!${NC}"
    return 0
  else
    echo -e "\n${RED}✗ Some tests failed${NC}"
    return 1
  fi
}

# Route to specific test or run all
case "$TEST_CASE" in
  signup)
    print_section "Signup Test"
    test_signup
    ;;
  reset_request)
    print_section "Password Reset Request Test"
    test_password_reset_request
    ;;
  reset_confirm)
    print_section "Password Reset Confirm Test"
    test_password_reset_confirm
    ;;
  login_invalid)
    print_section "Invalid Login Test"
    test_login_invalid
    ;;
  login_valid)
    print_section "Valid Login Test"
    test_login_valid
    ;;
  list_users)
    print_section "List Users Test"
    test_list_users
    ;;
  all|*)
    run_all_tests
    ;;
esac
