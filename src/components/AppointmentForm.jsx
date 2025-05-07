import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const AppointmentForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const selectedService = watch("service");

    const onSubmit = (data) => {
        console.log(data);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Reset after animation
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="p-4 bg-light rounded shadow"
        >
            <h3 className="text-center mb-4">Book an Appointment</h3>

            {submitted ? (
                <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    transition={{ type: "spring", stiffness: 100 }}
                    className="alert alert-success text-center"
                >
                    Appointment Booked Successfully!
                </motion.div>
            ) : (
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control {...register("name", { required: true })} placeholder="Enter your name" />
                                {errors.name && <small className="text-danger">Name is required</small>}
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" {...register("email", { required: true })} placeholder="Enter your email" />
                                {errors.email && <small className="text-danger">Valid email is required</small>}
                            </Form.Group>
                </Col>
                <Col md={4}>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="tel" {...register("phone", { required: true })} placeholder="Enter your phone number" />
                                {errors.phone && <small className="text-danger">Phone number is required</small>}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        
                        <Col md={12}>
                            <Form.Group>
                                <Form.Label>Service</Form.Label>
                                <Form.Control 
                                as="textarea"
                                rows={3}
                                placeholder="Describe your therapy needs"
                                {...register("service", { required: true })}>
                                    
                                </Form.Control>
                                {errors.service && <small className="text-danger">Please enter a service description</small>}
                            </Form.Group>
                        </Col>
                    </Row>

                    {selectedService === "massage" && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.3 }}
                            className="mt-3"
                        >
                            <Form.Group>
                                <Form.Label>Preferred Massage Type</Form.Label>
                                <Form.Control type="text" {...register("massageType")} placeholder="e.g., Deep Tissue, Relaxation" />
                            </Form.Group>
                        </motion.div>
                    )}

                    <div className="text-center mt-4">
                        <Button type="submit" variant="primary">Book Now</Button>
                    </div>
                </Form>
            )}
        </motion.div>
    );
};

export default AppointmentForm;