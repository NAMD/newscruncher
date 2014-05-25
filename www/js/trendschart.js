/**
 * Created by fccoelho on 25/05/14.
 */
$(draw_trends());
function draw_trends() {
        window.localStorage.nextpage = "sentiment.html"
        // Get the JSON and create the chart
        $.get('http://9003.hpc.pypln.org/articles/trends/?query=' + window.localStorage.query, function (trends) {

            $('#trends').highcharts({
                chart: {
                    type: "scatter",
                    zoomType: "x"
                },
                data: {
                    json: trends
                },

                title: {
                    text: 'Artigos por dia para a consulta <b>' + window.localStorage.query + '</b>'
                },

                subtitle: {
                    text: 'Source: MediaCloud Brasil'
                },

                xAxis: {
                    type: 'datetime',
                    gridLineWidth: 1,
                    labels: {
                        align: 'left',
                        x: 3,
                        y: -3
                    }
                },

                yAxis: { // left y axis
                    title: {
                        text: null
                    },
                    labels: {
                        align: 'left',
                        x: 3,
                        y: 16,
                        formatter: function () {
                            return Highcharts.numberFormat(this.value, 0);
                        }
                    },
                    showFirstLabel: false
                },

                legend: {
                    align: 'left',
                    verticalAlign: 'top',
                    y: 20,
                    floating: true,
                    borderWidth: 0
                },

                tooltip: {
                    shared: true,
                    crosshairs: [true, true],
                    formatter: function () {
                        return Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                this.y + ' articles'
                    }

                },

                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function () {
                                    hs.htmlExpand(null, {
                                        pageOrigin: {
                                            x: this.pageX,
                                            y: this.pageY
                                        },
                                        headingText: this.series.name,
                                        maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                                this.y + ' articles',
                                        width: 200
                                    });
                                }
                            }
                        },
                        marker: {
                            lineWidth: 1
                        }
                    }
                },

                series: [
                    {
                        name: 'All Articles',
                        lineWidth: 0,
                        type: "column",
                        marker: {
                            radius: 4
                        },
                        data: trends[0]
                    },
                    {
                        name: 'MA',
                        lineWidth: 2,
                        type: "spline",
                        marker: {
                            radius: 0
                        },
                        data: trends[1]
                    }
                ],
                credits: {
                    enabled: false
                }
            });
        });
    };