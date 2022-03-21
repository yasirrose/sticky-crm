import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { CreateFormulaService } from './create-formula.service';
import { Subscription } from 'rxjs';
import { formatDate } from '@angular/common';
import { ApiService } from 'src/app/api.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'fury-create-formula',
  templateUrl: './create-formula.component.html',
  styleUrls: ['./create-formula.component.scss']
})
export class CreateFormulaComponent implements OnInit, AfterViewInit, OnDestroy {

  fieldsCount: number;
  isGeneratedFields: boolean = false;
  isFormulated: boolean = false;
  isNewColumn: boolean = false;
  campaignError: boolean = false;
  canGenerateFormula: boolean = false;
  isRemoveHidden: boolean = true;
  totalFields = new FormControl();
  applyToCampaign = new FormControl();
  applyToColumn = new FormControl();
  formulaName = new FormControl();
  formulaShortcut = new FormControl();
  options: string[] = ['2', '3', '4', '5'];
  columns = [

    // 'billing_city'
    // 'billing_state'
    // 'billing_country'

    // 'billing_street_address2'


    // 'billing_postcode'
    // 'billing_state_id'

    // 'order_sales_tax_amount'

    // 'tracking_number'
    // 'cc_type'
    // 'campaign_id'
    // 'customer_id'
    // 'credit_card_number'
    // 'cc_expires'
    // 'prepaid_match'
    // 'gateway_id'
    // 'preserve_gateway'
    // 'gateway_descriptor'
    // 'processor_id'
    // 'ip_address'
    // 'decline_reason'
    // 'is_cascaded'
    // 'decline_reason_details'
    // 'shipping_date'
    // 'is_fraud'
    // 'is_chargeback'
    // 'chargeback_date'
    // 'is_rma'
    // 'rma_number'
    // 'rma_reason'
    // 'is_recurring'
    // 'retry_date'
    // 'auth_id'
    // 'hold_date'
    // 'is_void'
    // 'void_amount'
    // 'void_date'
    // 'is_refund'
    // 'refund_amount'
    // 'refund_date'
    // 'afid'
    // 'sid'
    // 'affid'
    // 'c1'
    // 'c2'
    // 'c3'
    // 'aid'
    // 'opt'
    // 'rebill_discount_percent'
    // 'billing_cycle'
    // 'parent_id'
    // 'main_product_id'
    // 'main_product_quantity'
    // 'order_confirmed'
    // 'order_confirmed_date'

    // 'is_blacklisted'
    // 'ancestor_id'
    // 'decline_salvage_discount_percent'
    // 'is_test_cc'
    // 'current_rebill_discount_percent'
    // 'amount_refunded_to_date'
    // 'shipping_id'
    // 'shipping_state_id'
    // 'affiliate'
    // 'cc_first_6'
    // 'cc_last_4'
    // 'cc_number'
    // 'cc_orig_first_6'
    // 'cc_orig_last_4'
    // 'check_account_last_4'
    // 'check_routing_last_4'
    // 'check_ssn_last_4'
    // 'check_transitnum'
    // 'child_id'
    // 'click_id'
    // 'coupon_discount_amount'
    // 'coupon_id'
    // 'created_by_user_name'
    // 'credit_applied'
    // 'customers_telephone'
    // 'email_address'
    // 'employeeNotes'
    // 'first_name'
    // 'is_3d_protected'
    // 'is_any_product_recurring'
    // 'last_name'
    // 'next_subscription_product'
    // 'next_subscription_product_id'
    // 'on_hold'
    // 'on_hold_by'
    // 'order_sales_tax'
    // 'order_status'
    // 'products'
    // 'promo_code'
    // 'recurring_date'
    // 'response_code'
    // 'return_reason'
    // 'stop_after_next_rebill'
    // 'sub_affiliate'
    // 'systemNotes'
    // 'time_stamp'
    // 'totals_breakdown'
    // 'transaction_id'
    // 'upsell_product_id'
    // 'upsell_product_quantity'
    // 'website_received'
    // 'website_sent'

    // { name: 'Order Id', property: 'order_id' },
    // { name:'Created By', property: 'created_by_employee_name' },
    // { name:'Bill First', property: 'billing_first_name' },
    // { name:'Bill Last', property: 'billing_last_name' },
    // { name:'Bill Address1', property: 'billing_street_address' },
    { name: 'Acq Date', property: 'acquisition_date' },
    // { name:'Acq Month', property: 'month unknown'},
    { name: 'PubID', property: 'c1' },
    // { name:'Trx Month', property: null },
    { name: 'Network', property: 'network unknown' },
    // { name:'Bill Phone', property: 'billing_telephone'},
    // { name:'Bill Email', property: 'billing_email'},
    // { name:'Ship First', property: 'shipping_first_name'},
    // { name:'Ship Last', property: 'shipping_last_name'},
    // { name:'Ship Address1', property: 'shipping_street_address'},
    // { name:'Ship Address2', property: 'shipping_street_address2'},
    // { name:'Ship City', property: 'shipping_city'},
    // { name:'Ship State', property:'shipping_state' },
    // { name:'Ship Zip', property: 'shipping_postcode'},
    // { name:'Ship Country', property: 'shipping_country' },
    // { name:'Ship Phone', property: 'shipping_telephone'},
    // { name:'Ship Email', property: 'shipping_email'},
    // { name:'Ship Method Name', property: 'shipping_method_name'},
    // { name:'Ship Method Description', property: null },
    // { name:'Ship Group Name', property: null },
    // { name:'Ship Group Code', property: null },
    { name: 'Ship Price', property: 'shipping_amount' },
    // { name:'Weight', property: null },
    // { name:'Delivery Confirmation', property: null },
    // { name:'Signature Confirmation', property: null },
    // { name:'Non Taxable Total', property: null },
    { name: 'Taxable Total', property: 'order_total' },
    { name: 'Sub Total', property: 'order_total' },
    { name: 'Sales Tax Percent', property: null },
    { name: 'Sales Tax Factor', property: null },
    { name: 'Order Total', property: 'order_total' },
    { name: 'Date of Sale', property: null },
    // { name:'Time of Sale', property: null },
    // { name:'Tracking Number', property: null },
    // { name:'Payment', property: null },
    // { name:'Campaign Id', property: null },
    // { name:'Customer Number', property: null },
    // { name:'Prospect Number', property: null },
    // { name:'CNPJ/CPF ID/Document ID', property: null },
    // { name:'Credit Card Number', property: null },
    // { name:'Credit Card Expiration', property: null },
    // { name:'Prepaid Match', property: null },
    // { name:'Gateway Id', property: null },
    // { name:'Gateway Alias', property: null },
    { name: 'Gateway Processing Percent', property: null },
    { name: 'Gateway Reserve Percent', property: null },
    { name: 'Gateway Transaction Fee', property: null },
    { name: 'Gateway Chargeback Fee', property: null },
    // { name:'Gateway Descriptor', property: null },
    // { name:'Gateway Customer Service Number', property: null },
    { name: 'Processor Id', property: null },
    // { name:'IP Address', property: null },
    // { name:'IP Address Lookup', property: null },
    // { name:'Order Status', property: null },
    // { name:'Decline Reason', property: null },
    { name: 'Is Cascaded', property: null },
    // { name:'Original Gateway Id', property: null },
    // { name:'Original Decline Reason', property: null },
    { name: 'Shipped Date', property: null },
    { name: 'Is Fraud', property: null },
    { name: 'Fraud Date', property: null },
    { name: 'Is Chargeback', property: null },
    { name: 'Chargeback Date', property: null },
    // { name:'Chargeback By', property: null },
    { name: 'Is RMA', property: null },
    { name: 'RMA Number', property: null },
    // { name:'RMA Reason', property: null },
    { name: 'RMA Date', property: null },
    { name: 'RMA Created By', property: null },
    { name: 'Return', property: null },
    // { name:'Return Reason', property: null },
    { name: 'Is Recurring', property: null },
    { name: 'Recurring Date', property: null },
    { name: 'Retry Date', property: null },
    { name: 'Total Installments', property: null },
    // { name:'Transaction Number', property: null },
    { name: 'Auth Number', property: null },
    { name: 'Retrying', property: null },
    { name: 'Retries Left', property: null },
    { name: 'Retry Attempt', property: null },
    { name: 'Hold Date', property: null },
    { name: 'Is Void', property: null },
    { name: 'Void Amount', property: null },
    { name: 'Void Date', property: null },
    { name: 'Voided By', property: null },
    { name: 'Is Refund', property: null },
    { name: 'Refund Amount', property: null },
    { name: 'Refund Date', property: null },
    { name: 'Refunded By', property: null },
    { name: 'AFID', property: null },
    { name: 'SID', property: null },
    { name: 'AFFID', property: null },
    { name: 'C1', property: null },
    { name: 'C2', property: null },
    { name: 'C3', property: null },
    { name: 'BID', property: null },
    { name: 'AID', property: null },
    { name: 'OPT', property: null },
    { name: 'Rebill Discount', property: null },
    { name: 'Billing Cycle', property: null },
    { name: 'Parent Order Id', property: null },
    { name: 'Product Id', property: null },
    // { name:'Product Name', property: null },
    { name: 'Product Attributes', property: null },
    { name: 'Is Product Shippable', property: null },
    { name: 'Product Price', property: null },
    { name: 'Product Sku #', property: null },
    // { name:'Product Category', property: null },
    // { name:'Description', property: null },
    { name: 'Quantity', property: null },
    { name: 'Declared Value', property: null },
    { name: 'Confirmation', property: null },
    { name: 'Confirmation Date', property: null },
    { name: 'Next Recurring Product', property: null },
    { name: 'Next Recurring Product Id', property: null },
    { name: 'Acquisition Date/Time', property: null },
    { name: 'Blacklisted', property: null },
    { name: 'Ancestor Order Id', property: null },
    { name: 'Decline Salvage Discount', property: null },
    { name: 'Decline Salvage Discount %', property: null },
    { name: 'Test', property: null },
    { name: 'Is Cancel', property: null },
    { name: 'Hold Type', property: null },
    { name: 'Offer Id', property: null },
    { name: 'Billing Model Id', property: null },
    // { name: 'Upsell Product Id #1', property: null },
    // { name: 'Upsell Product Name #1', property: null },
    // { name: 'Upsell Product Attributes #1', property: null },
    // { name: 'Is Recurring Upsell #1', property: null },
    // { name: 'Upsell Recurring Date #1', property: null },
    // { name: 'Upsell Retry Date #1', property: null },
    // { name: 'Upsell Hold Date #1', property: null },
    // { name: 'Upsell Retrying #1', property: null },
    // { name: 'Is Upsell Shippable #1', property: null },
    // { name: 'Upsell Product Price #1', property: null },
    // { name: 'Upsell Product Sku #1', property: null },
    // { name: 'Upsell Product Category #1', property: null },
    // { name: 'Upsell Description #1', property: null },
    // { name: 'Upsell Quantity #1', property: null },
    // { name: 'Upsell Declared Value #1', property: null },
    // { name: 'Upsell Next Recurring Product #1', property: null },
    // { name: 'Upsell Next Recurring Product Id #1', property: null },
    // { name: 'Upsell Offer Id #1', property: null },
    // { name: 'Upsell Billing Model Id #1', property: null },
    // { name: 'Upsell Product Id #2', property: null },
    // { name: 'Upsell Product Name #2', property: null },
    // { name: 'Upsell Product Attributes #2', property: null },
    // { name: 'Is Recurring Upsell #2', property: null },
    // { name: 'Upsell Recurring Date #2', property: null },
    // { name: 'Upsell Retry Date #2', property: null },
    // { name: 'Upsell Hold Date #2', property: null },
    // { name: 'Upsell Retrying #2', property: null },
    // { name: 'Is Upsell Shippable #2', property: null },
    // { name: 'Upsell Product Price #2', property: null },
    // { name: 'Upsell Product Sku #2', property: null },
    // { name: 'Upsell Product Category #2', property: null },
    // { name: 'Upsell Description #2', property: null },
    // { name: 'Upsell Quantity #2', property: null },
    // { name: 'Upsell Declared Value #2', property: null },
    // { name: 'Upsell Next Recurring Product #2', property: null },
    // { name: 'Upsell Next Recurring Product Id #2', property: null },
    // { name: 'Upsell Offer Id #2', property: null },
    // { name: 'Upsell Billing Model Id #2', property: null }
  ];
  operators: string[] = ['+', '-', '*', '/', '%'];
  applyToOptions: string[];
  campaignOptions: [];
  selectedOperands = ['', '', '', '', ''];
  selectedOperators = ['', '', '', ''];
  saveFormulaSubscription: Subscription;
  getCampaignsSubscription: Subscription;
  getCampaignColumnsSubscription: Subscription;
  formula: string = '';
  notyf = new Notyf();

  constructor(private apiService: ApiService, private formulaService: CreateFormulaService) { }

  ngOnInit(): void {
    this.getData();
    this.saveFormulaSubscription = this.formulaService.saveFormulaResponse$.subscribe(data => this.manageFormulaResponse(data))
    this.getCampaignsSubscription = this.formulaService.getCampaignsResponse$.subscribe(data => this.manageCampaignsResponse(data))
    this.getCampaignColumnsSubscription = this.formulaService.getCampaignsColumnsResponse$.subscribe(data => this.manageCampaignColumns(data))
  }

  ngAfterViewInit() {

  }

  getData() {
    this.formulaService.getCampaigns();
  }

  manageFormulaResponse(data) {
    if (data.status) {
      this.notyf.success('Formula Saved Successfully');
      this.clearFields();
    }
  }

  manageCampaignsResponse(data) {
    if (data.status) {
      this.campaignOptions = data.data;
    }
  }

  manageCampaignColumns(data) {
    if (data.status) {
      this.applyToOptions = data.data;
      this.campaignError = false;
    }
    else {
      this.applyToOptions = [];
      this.campaignError = true;
    }
  }

  generateFields() {
    if (this.fieldsCount != null) {
      this.isGeneratedFields = true;
    } else {
      this.notyf.error('Please select number of operands');
    }
  }

  clearFields() {
    this.totalFields.setValue(null);
    this.isGeneratedFields = false;
    this.isFormulated = false;
    this.canGenerateFormula = false;
    this.isRemoveHidden = true;
    this.selectedOperands = ['', '', '', '', ''];
    this.selectedOperators = ['', '', '', ''];
    this.applyToCampaign.setValue('');
    this.applyToColumn.setValue('');
  }

  counter(N: number) {
    return Array.from({ length: N }, (v, i) => i);
  }

  generateFormula() {
    for (var i = 0; i < this.fieldsCount; i++) {
      if (!this.selectedOperands[i]) {
        this.canGenerateFormula = false;
        // alert('Please select the empty fields');
      } else {
        this.canGenerateFormula = true;
      }
    }
    if (this.canGenerateFormula) {
      this.formula = '';
      // this.formula += '(';
      for (var i = 0; i < 5; i++) {
        if (this.selectedOperands[i]) {
          this.formula += this.selectedOperands[i];
        }
        if (this.selectedOperators[i]) {
          this.formula += this.selectedOperators[i];
        }
      }
      this.isFormulated = true;
    }
    else {
      this.isFormulated = false;
      this.notyf.error('There are empty fields');
    }
  }

  addField() {
    if (this.fieldsCount < 5) {
      this.isRemoveHidden = false;
      this.isFormulated = false;
      this.fieldsCount++;
    }
    else {
      this.notyf.error("More fields cannot be added");
    }
  }

  removeField() {
    if (this.fieldsCount >= 0) {
      if (this.fieldsCount == 2) {
        this.isRemoveHidden = true;
        // remove both two
      }
      else {
        this.isFormulated = false;
        this.selectedOperands[this.fieldsCount - 1] = '';
        this.selectedOperators[this.fieldsCount - 2] = '';
        this.fieldsCount--;
        if (this.fieldsCount == 2) {
          this.isRemoveHidden = true;
        }
      }
    }
  }

  campaignChanged(value) {
    this.formulaService.getCampaignColumns(value);
  }

  showNewColumn() {
    this.isNewColumn = !this.isNewColumn;
  }

  showAllColumns() {
    this.isNewColumn = !this.isNewColumn;

  }

  testFormula() {

  }

  saveFormula() {
    var campaign_name = this.applyToCampaign.value;
    var column_name = this.applyToColumn.value;
    var expression = this.formula;
    var name = this.formulaName.value;
    var shortcut_name = this.formulaShortcut.value;
    if (campaign_name && column_name && expression) {
      var data = {
        'operands': this.selectedOperands,
        'operators': this.selectedOperators,
        'campaign_name': campaign_name,
        'column_name': column_name,
        'expression': expression,
        'name': name,
        'shortcut_name': shortcut_name
      };

      this.formulaService.saveFormula(data);
    }
    else {
      this.notyf.error("Please Fill in the required data")
    }
  }

  hideGeneratedFormula() {
    this.isFormulated = false;
  }

  ngOnDestroy() {

  }
}
