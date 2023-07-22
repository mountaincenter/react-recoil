require "test_helper"

class MutesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get mutes_create_url
    assert_response :success
  end

  test "should get destroy" do
    get mutes_destroy_url
    assert_response :success
  end
end
