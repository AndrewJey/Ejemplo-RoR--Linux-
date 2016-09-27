class User < ActiveRecord::Base

  before_create :setpassword

  def setpassword
    self.password=Digest::MD5.hexdigest(self.password)
  end
end
