from flask import Flask, render_template, url_for
app = Flask(__name__)

#1. path to  index file
@app.route('/')
def index():
    print("Server received request for 'index' page...")
    return render_template('index.html')

#2. path to heatmap
@app.route('/heatmap')
def heatmap():
    print("Server received request for 'heatmap' page...")
    return render_template('maps.html')

#3. path to sighting over stat pop ratio
@app.route('/total_sightings_state_year')
def heatmap():
    print("Server received request for 'total_sightings_state_year' page...")
    return render_template('total_sightings_state_year.html')


#4. path to bar chart of state and shape of ufo
@app.route('/shape_chart')
def heatmap():
    print("Server received request for 'shape_chart' page...")
    return render_template('shape_chart.html')

#5. path to line chart time of day (TOD) sightings
@app.route('/TOD')
def heatmap():
    print("Server received request for 'TOD' page...")
    return render_template('TOD.html')

if __name__ == '__main__':
    app.debug = True
    app.run()
