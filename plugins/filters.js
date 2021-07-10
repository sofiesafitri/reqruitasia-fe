import Vue from "vue";

// Format date
Vue.filter("format_date", function(value, locale) {
    var date = new Date(value);
    return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    });
});

// Format date only
Vue.filter("format_date_only", function(value, locale) {
    var date = new Date(value);
    return date.toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
});

// Format currency
Vue.filter("format_currency", function(value, locale, currency) {
    if (value === null) {
        return "";
    }

    let fractionDigit = currency == "IDR" ? 0 : 2;

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: fractionDigit
    }).format(value);
});

// Format number
Vue.filter("format_number", function(value, locale, currency_symbol = "") {
    if (value === null) {
        return "";
    }

    if (value !== undefined) {
        value = parseFloat(value);
        let fraction = locale == "id-ID" ? 0 : 2;

        return (
            currency_symbol +
            " " +
            value.toLocaleString(locale, {
                minimumFractionDigits: fraction,
                maximumFractionDigits: fraction
            })
        );
    }
});

// Make image from base64
Vue.filter("base64image", function(value) {
    return `data:image/jpeg;base64,${value}`;
});

// rgba filter
Vue.filter("rgba", function(rawRgba) {
    var r = rawRgba.r;
    var g = rawRgba.g;
    var b = rawRgba.b;
    var a = rawRgba.a;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
});
