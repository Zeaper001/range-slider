import "./style.css";
import {prices, yearPrices} from './store.js';

class PriceSelector {

    constructor(element) {

        self = this;

        this.element = element;
        this.priceControls = this.element.querySelectorAll('.Price--Selector__price-controls li');
        this.subscription = this.element.querySelector('.Price--Selector__subscription-price');
        this.period = this.element.querySelector('.Price--Selector__subscription-period');

        const PAYMENT_PERIODS = {
            monthly: prices,
            yearly: yearPrices
        };

        this.state = {
            paymentPeriod: PAYMENT_PERIODS['monthly'],
            selectedPrice: 'priceRange1',
            priceListener: function(val) {},
            set price(val) {
                this.selectedPrice = val;
                this.priceListener(val);
            },
            get price() {
                return this.selectedPrice;
            },
            registerListener: function(listener) {
                this.priceListener = listener;
            }
        };

        this.bindEvents();
        this.setPrice();
    }

    bindEvents() {
        self.priceControls.forEach((item, index) => {
            item.addEventListener('click', () => {
                self.state.price = item.dataset.priceRange;
            })
        });

        self.state.registerListener(function() {
            self.setPrice();
        })
    }

    setPrice() {
        self.subscription.innerHTML = prices[self.state.price].standard;
    }


}


const wrapper = document.querySelector('.Price--Selector');

new PriceSelector(wrapper);