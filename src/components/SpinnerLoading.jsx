import { MDBSpinner } from 'mdb-react-ui-kit'

export default function SpinnerLoading() {
    return (
        <div>
            <div style={spinnerContainer}>
                <div style={overlay}></div>
                <MDBSpinner style={{ position: 'relative', zIndex: 999, }} color='primary' role='status'><span className='visually-hidden'>Loading...</span></MDBSpinner>
            </div>
        </div>
    )
}

const spinnerContainer = {
    'position': 'fixed',
    'top': 0,
    'left': 0,
    'width': '100%',
    'height': '100%',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'zIndex': '999', /* Menentukan lapisan atas sehingga berada di atas konten */
}

const overlay = {
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'width': '100%',
    'height': '100%',
    'backgroundColor': 'rgba(255, 255, 255, 0.7)',
    'zIndex': '998', /* Warna dark overlay */
}

/* Atur styling spinner sesuai kebutuhan Anda */

