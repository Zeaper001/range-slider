import {prices, yearPrices} from './store.js';
import {animateCount} from './counter.js';

class PriceSelector {

    constructor(element) {

        this.element = element;

        this.priceControls = this.element.querySelectorAll('.Price--Selector__price-controls li');
        this.periodControls = this.element.querySelectorAll('.Price--Selector__subscription-period li');
        this.subscription = this.element.querySelector('.Price--Selector__subscription-price');
        this.customer_score = this.element.querySelector('.Price--Selector__customer-score');
        this.shipping_score = this.element.querySelector('.Price--Selector__shipping-score');

        this.PAYMENT_PERIODS = {
            monthly: prices,
            yearly: yearPrices
        };

        this.state = {
            paymentPeriod: 'monthly',
            selectedPrice: 'priceRange1',
            set price(val) {
                this.selectedPrice = val;
                this.stateListener(val);
            },
            get price() {
                return this.selectedPrice;
            },
            set period(val) {
                this.paymentPeriod = val;
                this.stateListener(val);
            },
            get period() {
                return this.paymentPeriod;
            },
            stateListener: function(val) {},
            registerListener: function(listener) {
                this.stateListener = listener;
            }
        };

        this.bindEvents();
        this.setPrices();
        animateCount(document.querySelector('.Count-element'));
    }

    bindEvents() {
        this.priceControls.forEach((item) => {
            item.addEventListener('click', () => {
                this.state.price = item.dataset.priceRange;
            })
        });

        this.periodControls.forEach((item) => {
            item.addEventListener('click', () => {
                this.state.period = item.dataset.periodRange;
            })
        });


        this.state.registerListener(() => {
            this.setPrices();

            this.priceControls.forEach((item) => {
                if(item.dataset.priceRange === this.state.price) {
                    return item.classList.add('active-price');
                }

                item.classList.remove('active-price');
            });

            this.periodControls.forEach((item) => {
                if(item.dataset.periodRange === this.state.period) {
                    return item.classList.add('active-price');
                }

                item.classList.remove('active-price');
            });
        })
    }

    setPrices() {
        if(this.subscription) {
            this.subscription.innerHTML = this.PAYMENT_PERIODS[this.state.period][this.state.price].standard;
        }

        if(this.customer_score) {
            this.customer_score.innerHTML = this.PAYMENT_PERIODS[this.state.period][this.state.price].customerScore;
        }

        if(this.shipping_score) {
            this.shipping_score.innerHTML = this.PAYMENT_PERIODS[this.state.period][this.state.price].shippingScore;
        }
    }
}

export default PriceSelector;