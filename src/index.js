import "./style.css";
import {prices, yearPrices} from './store.js';

class PriceSelector {

    constructor(element) {
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
        // let self = this;

        this.priceControls.forEach((item) => {
            item.addEventListener('click', () => {
                this.state.price = item.dataset.priceRange;
            })
        });

        this.state.registerListener(() => {
            this.setPrice();
        })
    }

    setPrice() {
        this.subscription.innerHTML = prices[this.state.price].standard;
    }


}


const wrapper = document.querySelector('.Price--Selector');

new PriceSelector(wrapper);