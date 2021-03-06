import React, {useState} from 'react';
import { Form, Col } from 'react-bootstrap'
import Login from './Login.js'
//const REACT_APP_SERVER_URL =process.env.REACT_APP_SERVER_URL;

const Signup = (props) => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [name, setName] = useState('')
    let [weight, setWeight] = useState(null)
    let [DOB, setDOB] = useState(null)
    let [confirmPassword, setConfirmPassword] = useState('')
    let [redirect, setRedirect] = useState(false)

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleWeight = (e) => {
        setWeight(e.target.value);
    }

    const handleDOB = (e) => {
        console.log(e.target.value)
        setDOB(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(password,confirmPassword)
        if (password === confirmPassword) {
            const newUser = { name, weight, DOB, email, password }
            console.log(`${REACT_APP_SERVER_URL}/auth/signup`)
            axios.post(`${REACT_APP_SERVER_URL}/auth/signup`, newUser)
            .then(response => {
                console.log('Response: ' + response);
                setRedirect(true);
            })
            .catch(error => console.log(error));
        }
    }

    if (redirect) return <Redirect to="/login" />

    return (
        <div className="card card-body signup-page">
        <h2 className="py-2 title bold signup-title-div">
            <span className='signup'>Signup</span>
            <span className='login'>Login</span>
        </h2>
        <Form onSubmit={handleSubmit} className='signup-form'>
            <Form.Row className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={name} onChange={handleName} className="form-control"/>
            </Form.Row>
            <Form.Row className="form-group">
                <Col>
                <label htmlFor="weight">Weight</label>
                <input type="number" name="weight" value={weight} onChange={handleWeight} className="form-control"/>
                </Col>
                <Col>
                <label htmlFor="DOB">Date of Birth</label>
                <input type="date" name="DOB" value={DOB} onChange={handleDOB} className="form-control"/>
                </Col>
            </Form.Row>
            <Form.Row className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={handleEmail} className="form-control"/>
            </Form.Row>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={handlePassword} className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} className="form-control"/>
            </div>
            <button type="submit" className="link-button btn btn-primary float-right">Submit</button>
        </Form>
    </div>     
    );
}

export default Signup;
