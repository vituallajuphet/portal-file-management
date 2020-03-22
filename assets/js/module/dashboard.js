/*
Template Name: Admin Pro Admin
Author: Wrappixel
Email: niravjoshi87@gmail.com
File: js
*/
$(function () {
    "use strict";
    // ============================================================== 
    // Our Visitor
    // ============================================================== 
    axios.get(`${BASE_URL}api/get_pie_graph_data`).then(res => {
        let req_counts = 0;
        let app_counts = 0;
        let pro_counts = 0;
        
        if (res.data.code == 200) {
            let res_data = res.data.data;
            req_counts = res_data.req_count;
            app_counts = res_data.app_count;
            pro_counts = res_data.pro_count;
        }

        var chart = c3.generate({
            bindto: '#visitor',
            data: {
                columns: [
                    ['Request', req_counts],
                    ['Approved', app_counts],
                    ['Processed', pro_counts],
                ],

                type: 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
                label: {
                    show: false
                },
                title: "File Activity",
                width: 20,

            },

            legend: {
                hide: false
                //or hide: 'data1'
                //or hide: ['data1', 'data2']
            },
            color: {
                pattern: ['#28a745', '#000a24', '#c5a36f']
            }
        });
        
        
    })

    

    // ============================================================== 
    // This is for the popup message while page load
    // ============================================================== 

});
