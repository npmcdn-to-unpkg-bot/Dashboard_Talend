
$(function() {

    Morris.Bar({
        element: 'morris-bar-chart-transaction', data: [
            {  month: 'JAN.', last_year: 66520, current_year: 46440 },
            {  month: 'FEB.', last_year: 57610, current_year: 47650 },
            {  month: 'MAR.', last_year: 68765, current_year: 7674 },
            {  month: 'APR.', last_year: 65875, current_year: 51444 },
            {  month: 'MAY.', last_year: 8620, current_year: 7654 },
            {  month: 'JUN.', last_year: 82021, current_year: 4764 },
            {  month: 'JUL.', last_year: 22340, current_year: 14654 },
            {  month: 'AUG.', last_year: 54320, current_year: 65454 },
            {  month: 'SEPT.', last_year: 54320, current_year: 32154 },
            {  month: 'OCT.', last_year: 4320, current_year: 12354 },
            {  month: 'NOV.', last_year: 1240, current_year: 42154 },
            {  month: 'DEC.', last_year: 7720, current_year: 12154 }
        ],
        xkey: 'month',
        ykeys: ['last_year', 'current_year'],
        labels: ['2015', '2016'],
        barColors: ["#08298A", "#FF4500"],     /* ["#08298A", "#FF4500"]   ["#01A9DB, "#DF013A"]*/
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart1',
        data: [{
            label: "AURORA",
            value: 12234213
        }, {
            label: "NETSUITE",
            value: 20321321
        }],
        resize: true
    });


    Morris.Donut({
        element: 'morris-donut-chart2',
        data: [{
            label: "AURORA",
            value: 234213
        }, {
            label: "NETSUITE",
            value: 321321
        }],
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart3',
        data: [{
            label: "AURORA",
            value: 1213
        }, {
            label: "NETSUITE",
            value: 2321
        }],
        resize: true
    });



    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            month: 'TRANSACTIONS',
            a: 100,
            b: 90,
            c: 150,
            d: 143
        }, {
            month: 'TRANSACTION LINES',
            a: 75,
            b: 65,
            c: 150,
            d: 174
        }, {
            month: 'TRANSACTION LINKS',
            a: 50,
            b: 40,
            c: 150,
            d: 148
        }],
        xkey: 'month',
        ykeys: ['a', 'b', 'c', 'd'],
        labels: ['Finished', 'Working', 'Warm', 'Error'],
        barColors: ["#1531B2", "#0b9fbf", "#1AB244", "#B21516"],
        hideHover: 'auto',
        resize: true
    });

});
