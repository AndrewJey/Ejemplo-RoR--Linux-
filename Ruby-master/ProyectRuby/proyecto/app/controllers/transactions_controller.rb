class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:show, :edit, :update, :destroy]

  # GET /transactions
  # GET /transactions.json
  def index
    @transactions = Transaction.all
  end

  # GET /transactions/1
  # GET /transactions/1.json
  def show
  end

  # GET /transactions/new
  def new
    @transaction = Transaction.new
  end

  # GET /transactions/1/edit
  def edit
  end

  # POST /transactions
  # POST /transactions.json
  def create
    @result
    @transaction = Transaction.new(params.require(:transaction).permit(:offert_product_id, :require_product_id))
    @productoffert=Product.where(:id => @transaction.offert_product_id).first
    @productrequire=Product.where(:id => @transaction.require_product_id).first
    if(@productoffert== nil && @productrequire==nil)
        @result={status:422 , message:'Producto offer id or require doesnt exits'}
    else
      if(Transaction.where(:offert_product_id => @transaction.offert_product_id).where(:require_product_id=>@transaction.require_product_id).first)
        @result={status:422 , message:'There is already transaction with that arguments'}
      else
        if @transaction.save
          @result={status:200 , message:'Transaction created'}
        else
          @result={status:200 , message:'There was an a error created the transactions'}
        end
      end
    end
    respond_to do |format|
      format.html { render json: @result }
      format.json { render json: @result }
    end
  end

  # PATCH/PUT /transactions/1
  # PATCH/PUT /transactions/1.json
  def update
    respond_to do |format|
      if @transaction.update(transaction_params)
        format.html { redirect_to @transaction, notice: 'Transaction was successfully updated.' }
        format.json { render :show, status: :ok, location: @transaction }
      else
        format.html { render :edit }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /transactions/1
  # DELETE /transactions/1.json
  def destroy
    @transaction.destroy
    respond_to do |format|
      format.html { redirect_to transactions_url, notice: 'Transaction was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_transaction
      @transaction = Transaction.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def transaction_params
      params.require(:transaction).permit(:offert_product_id, :require_product_id)
    end
end
