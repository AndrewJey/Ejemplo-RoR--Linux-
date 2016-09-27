class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
   protect_from_forgery with: :null_session


   before_action :authenticate, except: [:signin]
   protected
   def authenticate
      @token=request.headers['Authorization']
      if(ApiKey.where(:access_token => @token).first)

      else
         @msg={status:422 , response: 'No access to do that'}
         respond_to do |format|
            format.html { render json: @msg }
            format.json { render json: @msg }
         end
      end
   end
end
