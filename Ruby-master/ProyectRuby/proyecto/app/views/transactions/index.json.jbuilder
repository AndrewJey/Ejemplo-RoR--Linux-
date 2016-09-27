json.array!(@transactions) do |transaction|
  json.extract! transaction, :id, :offert_product_id, :require_product_id
  json.url transaction_url(transaction, format: :json)
end
