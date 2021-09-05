import {Carousel} from "react-bootstrap";

export default function HomeComponent(){

    return (
        <>
            <h1 className="text-success text-center">Music For Infinite Inspiration</h1>
            <hr/>
            <div className="vh-100">
            <Carousel fade>
                <Carousel.Item>
                    <img

                        className="d-block w-100"
                        src="https://przemekspider.com/wp-content/uploads/2017/05/concerts-in-Delhi.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://musiccitymike.files.wordpress.com/2020/04/benefits-of-going-to-live-music-concerts.jpg?w=640"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/3/2018/03/03103805/big-concert-audience-listening-to-music-at-festival-picture-id485343244.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </div>
        </>
    )
}