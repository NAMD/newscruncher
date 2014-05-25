/**
 * Created by fccoelho on 25/05/14.
 */
$(draw_sent());
function draw_sent() {
        window.localStorage.nextpage = "index.html"
        // Get the JSON and create the chart

        $.get('http://9003.hpc.pypln.org?query=' + window.localStorage.query, function (dados) {
            $('#sentiment').highcharts({

                chart: {
                    type: "areaspline",
                    zoomType: "x"
                },
                data: {
                    json: dados
                },

                title: {
                    text: 'Sentimento diário para a consulta: <b>' + window.localStorage.query + '</b>'
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
                                'Sentiment: ' + this.y
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
                                        headingText: "Sentence Sentiment",
                                        maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                                'Average article Sentiment: ' + this.y + ':<br/> ' +
                                                $.ajax({url: 'http://9003.hpc.pypln.org/sentsent?date=' +
                                                        Highcharts.dateFormat('%m-%d-%Y', this.x) + '&word=' +
                                                        window.localStorage.query, async: false }).responseText,
                                        width: 600,
                                        height: 600
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
                        name: 'Sentiment',
                        lineWidth: 0,
                        //type: "spline",
                        marker: {
                            radius: 4
                        },
                        data: dados
                    }
                ],
                credits: {
                    enabled: false
                }
            });
        });

    };