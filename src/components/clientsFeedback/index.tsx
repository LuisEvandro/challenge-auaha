import { useEffect, useState } from 'react';

import styles from './styles.module.scss'

import Slider from "react-slick";
import { FeedbackInterface } from '../../lib/interfaces';
import feedbacksJson from "../../../utils/clientsFeedback.json";

export function ClientsFeedback() {

    const [ feedbacks, setFeedbacks ] = useState<FeedbackInterface[]>([])

    useEffect(() => {
        setFeedbacks(feedbacksJson)
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 8000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    return (
        <div className={styles.feedbacks_content}>
            <p className={styles.feedbacks_title}>O que os clientes dizem</p>
            <div className={styles.feedbacks}>
                <div className={styles.desktop}>
                    {
                        feedbacks.slice(0, 3).map((item: FeedbackInterface, index: number) => {
                            return(
                                <div className={styles.feedback_item} key={index}>
                                    <p className={styles.feedback_item_name}>
                                        {item.name}
                                    </p>
                                    <p className={styles.feedback_item_message}>
                                        {(item.message).substring(0, 157)} {(item.message).length > 157 && '...'}
                                    </p>
                                    <p className={styles.feedback_item_date}>
                                        {item.create_date}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={styles.mobile}>
                    <Slider {...settings}>
                        {
                            feedbacks.slice(0, 3).map((item: FeedbackInterface, index: number) => {
                                return(
                                    <div className={styles.feedback_item} key={index}>
                                        <p className={styles.feedback_item_name}>
                                            {item.name}
                                        </p>
                                        <p className={styles.feedback_item_message}>
                                            {(item.message).substring(0, 157)} {(item.message).length > 157 && '...'}
                                        </p>
                                        <p className={styles.feedback_item_date}>
                                            {item.create_date}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    )
}