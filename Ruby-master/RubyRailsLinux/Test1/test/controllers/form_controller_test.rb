require 'test_helper'

class FormControllerTest < ActionController::TestCase
  test "should get form" do
    get :form
    assert_response :success
  end

end
