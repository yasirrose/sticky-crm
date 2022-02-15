export class ProductDetailModel {
    product_id: number;
    sku: string;
    price: string;
    product_qty: string;
    product_name: string;
    is_recurring: string;
    is_terminal: string;
    subscription_id: string;
    billing_model_discount: string;
    is_add_on: string;
    is_in_trial: string;
    step_number: string;
    is_shippable: string;
    refund_amount: string;
    hold_date: string;
    billing_model_name: string;
    billing_model_description: string;
    offer_name: string;

    constructor(product) {
      this.product_id = product.product_id;
      this.sku = product.sku;
      this.price = product.price;
      this.product_qty = product.product_qty;
      this.product_name = product.name;
      this.is_recurring = product.is_recurring;
      this.is_terminal = product.is_terminal;
      this.subscription_id = product.subscription_id;
      this.billing_model_discount = product.billing_model_discount;
      this.is_add_on = product.is_add_on;
      this.is_in_trial = product.is_in_trial;
      this.step_number = product.step_number;
      this.is_shippable = product.is_shippable;
      this.refund_amount = product.refund_amount;
      this.hold_date = product.hold_date;
      this.billing_model_name = product.billing_model.name;
      this.billing_model_description = product.billing_model.description;
      this.offer_name = product.offer.name;
    }
  }
  