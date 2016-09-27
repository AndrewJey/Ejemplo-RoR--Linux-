class WelcomeController < ApplicationController
  def index
  end

  def signin
    @msg
    @user = User.new(params.require(:user).permit(:username, :password))
    @user.password=Digest::MD5.hexdigest(@user.password)
    if User.where(:username=>@user.username).where(:password=>@user.password).first
      if ApiKey.where(:username=>params[:username]).first
        update = ApiKey.where(:username=>params[:username]).first
        update.update(current: DateTime.now)
        if update != nil
          msg = { status: 200 , auth_token: update.access_token}
        else
          msg = { status: 422}
        end
        respond_to do |format|
          format.html { render json: msg }
          format.json { render json: msg }
        end
      else
        token = ApiKey.create(username: params['username'], current: DateTime.now)
        if token != nil
          msg = { status: 201 , auth_token: token.access_token}
        else
          msg = { status: 422 }
        end
        respond_to do |format|
          format.html { render json: msg }
          format.json { render json: msg }
        end
      end
    else
      msg = { status: 401 , response: {error:'Username or password invalid.'}}
      respond_to do |format|
        format.html { render json: msg }
        format.json { render json: msg }
      end
    end
  end


  def signout
    @msg
    token = ApiKey.find_by(access_token: request.headers['Authorization'])
    if token != nil
      token.destroy
      msg = { status: 200 , auth_token: request.headers['Authorization']}
    else
      msg = { status: 422 , error: 'Token not found!.'}
    end
    respond_to do |format|
      format.html { render json: msg }
      format.json { render json: msg }
    end
  end
end
