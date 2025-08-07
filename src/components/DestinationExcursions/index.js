import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import TourCard from "../TourCard";

const DestinationExcursions = () => {
    const { location } = useParams();
    const { t } = useTranslation();
    const [tours, setTours] = useState([]);
    const [pageTitle, setPageTitle] = useState('');

    useEffect(() => {
        // Load different data based on location parameter
        if (location) {
            loadLocationExcursions(location);
        }
    }, [location]);

    const loadLocationExcursions = (locationParam) => {
        // Here you would fetch data specific to the location
        switch (locationParam) {
            case 'hurghada':
                setPageTitle(t('main_navbar.hurghada'));
                setTours([
                    {
                        id: 1,
                        title: "Ausflüge ab Hurghada",
                        description:
                            "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Online buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                            "Inklusive Versicherung",
                            "Keine Verkaufsveranstaltungen",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 2,
                        title: "DOLPHIN WATCH und Schnorcheln",
                        description: "Erlebe Sie hautnah die faszinierende Welt der Delfine bei einem Schnorchelausflug ab Hurghada",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Kostenlose Stornierung",
                            "Dauer 7 Stunden",
                            "jetzt buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 3,
                        title: "Hurghada Stadtrundfahrt",
                        description: "Entdecken Sie das authentische Hurghada mit travelpro Hurghada stadtrundfahrt Privat",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Deutschsprechender Reiseleiter",
                            "Dauer 4 Stunden",
                            "Abholung von der Lobby Ihres Hotels",
                            "Keine Kaffeefahrt",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 4,
                        title: "Luxor Tagesausflug",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Tal der Könige",
                            "Karnak Tempel",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 5,
                        title: "Schnorcheln im Roten Meer",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Schnorchelausrüstung",
                            "2 Schnorchelstopps",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 6,
                        title: "Kairo und Pyramiden",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Pyramiden von Gizeh",
                            "Ägyptisches Museum",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                ]
                );
                break;
            case 'makadi-bay':
                setPageTitle(t('main_navbar.makadi_bay'));
                setTours([
                    {
                        id: 1,
                        title: "Ausflüge ab Hurghada",
                        description:
                            "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Online buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                            "Inklusive Versicherung",
                            "Keine Verkaufsveranstaltungen",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 2,
                        title: "DOLPHIN WATCH und Schnorcheln",
                        description: "Erlebe Sie hautnah die faszinierende Welt der Delfine bei einem Schnorchelausflug ab Hurghada",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Kostenlose Stornierung",
                            "Dauer 7 Stunden",
                            "jetzt buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 3,
                        title: "Hurghada Stadtrundfahrt",
                        description: "Entdecken Sie das authentische Hurghada mit travelpro Hurghada stadtrundfahrt Privat",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Deutschsprechender Reiseleiter",
                            "Dauer 4 Stunden",
                            "Abholung von der Lobby Ihres Hotels",
                            "Keine Kaffeefahrt",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 4,
                        title: "Luxor Tagesausflug",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Tal der Könige",
                            "Karnak Tempel",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 5,
                        title: "Schnorcheln im Roten Meer",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Schnorchelausrüstung",
                            "2 Schnorchelstopps",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 6,
                        title: "Kairo und Pyramiden",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Pyramiden von Gizeh",
                            "Ägyptisches Museum",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                ]
                );
                break;
            case 'el-gouna':
                setPageTitle(t('main_navbar.el_gouna'));
               setTours([
                    {
                        id: 1,
                        title: "Ausflüge ab Hurghada",
                        description:
                            "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Online buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                            "Inklusive Versicherung",
                            "Keine Verkaufsveranstaltungen",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 2,
                        title: "DOLPHIN WATCH und Schnorcheln",
                        description: "Erlebe Sie hautnah die faszinierende Welt der Delfine bei einem Schnorchelausflug ab Hurghada",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Kostenlose Stornierung",
                            "Dauer 7 Stunden",
                            "jetzt buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 3,
                        title: "Hurghada Stadtrundfahrt",
                        description: "Entdecken Sie das authentische Hurghada mit travelpro Hurghada stadtrundfahrt Privat",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Deutschsprechender Reiseleiter",
                            "Dauer 4 Stunden",
                            "Abholung von der Lobby Ihres Hotels",
                            "Keine Kaffeefahrt",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 4,
                        title: "Luxor Tagesausflug",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Tal der Könige",
                            "Karnak Tempel",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 5,
                        title: "Schnorcheln im Roten Meer",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Schnorchelausrüstung",
                            "2 Schnorchelstopps",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 6,
                        title: "Kairo und Pyramiden",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Pyramiden von Gizeh",
                            "Ägyptisches Museum",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                ]
                );
                break;
            case 'soma-bay':
                setPageTitle(t('main_navbar.soma_bay'));
                setTours([
                    {
                        id: 1,
                        title: "Ausflüge ab Hurghada",
                        description:
                            "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Online buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                            "Inklusive Versicherung",
                            "Keine Verkaufsveranstaltungen",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 2,
                        title: "DOLPHIN WATCH und Schnorcheln",
                        description: "Erlebe Sie hautnah die faszinierende Welt der Delfine bei einem Schnorchelausflug ab Hurghada",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Kostenlose Stornierung",
                            "Dauer 7 Stunden",
                            "jetzt buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 3,
                        title: "Hurghada Stadtrundfahrt",
                        description: "Entdecken Sie das authentische Hurghada mit travelpro Hurghada stadtrundfahrt Privat",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Deutschsprechender Reiseleiter",
                            "Dauer 4 Stunden",
                            "Abholung von der Lobby Ihres Hotels",
                            "Keine Kaffeefahrt",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 4,
                        title: "Luxor Tagesausflug",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Tal der Könige",
                            "Karnak Tempel",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 5,
                        title: "Schnorcheln im Roten Meer",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Schnorchelausrüstung",
                            "2 Schnorchelstopps",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 6,
                        title: "Kairo und Pyramiden",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Pyramiden von Gizeh",
                            "Ägyptisches Museum",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                ]
                );
                break;
            case 'sahl-hashesh':
                setPageTitle(t('main_navbar.sahl_hashesh'));
                setTours([
                    {
                        id: 1,
                        title: "Ausflüge ab Hurghada",
                        description:
                            "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Online buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                            "Inklusive Versicherung",
                            "Keine Verkaufsveranstaltungen",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 2,
                        title: "DOLPHIN WATCH und Schnorcheln",
                        description: "Erlebe Sie hautnah die faszinierende Welt der Delfine bei einem Schnorchelausflug ab Hurghada",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Kostenlose Stornierung",
                            "Dauer 7 Stunden",
                            "jetzt buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 3,
                        title: "Hurghada Stadtrundfahrt",
                        description: "Entdecken Sie das authentische Hurghada mit travelpro Hurghada stadtrundfahrt Privat",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Deutschsprechender Reiseleiter",
                            "Dauer 4 Stunden",
                            "Abholung von der Lobby Ihres Hotels",
                            "Keine Kaffeefahrt",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 4,
                        title: "Luxor Tagesausflug",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Tal der Könige",
                            "Karnak Tempel",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 5,
                        title: "Schnorcheln im Roten Meer",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Schnorchelausrüstung",
                            "2 Schnorchelstopps",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 6,
                        title: "Kairo und Pyramiden",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Pyramiden von Gizeh",
                            "Ägyptisches Museum",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                ]
                );
                break;
            case 'el-quseir':
                setPageTitle(t('main_navbar.el_quseir'));
              setTours([
                    {
                        id: 1,
                        title: "Ausflüge ab Hurghada",
                        description:
                            "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Online buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                            "Inklusive Versicherung",
                            "Keine Verkaufsveranstaltungen",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 2,
                        title: "DOLPHIN WATCH und Schnorcheln",
                        description: "Erlebe Sie hautnah die faszinierende Welt der Delfine bei einem Schnorchelausflug ab Hurghada",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Kostenlose Stornierung",
                            "Dauer 7 Stunden",
                            "jetzt buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 3,
                        title: "Hurghada Stadtrundfahrt",
                        description: "Entdecken Sie das authentische Hurghada mit travelpro Hurghada stadtrundfahrt Privat",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Deutschsprechender Reiseleiter",
                            "Dauer 4 Stunden",
                            "Abholung von der Lobby Ihres Hotels",
                            "Keine Kaffeefahrt",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 4,
                        title: "Luxor Tagesausflug",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Tal der Könige",
                            "Karnak Tempel",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 5,
                        title: "Schnorcheln im Roten Meer",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Schnorchelausrüstung",
                            "2 Schnorchelstopps",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 6,
                        title: "Kairo und Pyramiden",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Pyramiden von Gizeh",
                            "Ägyptisches Museum",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                ]
                );
                break;
            case 'marsa-alam':
                setPageTitle(t('main_navbar.marsa_alam'));
                setTours([
                    {
                        id: 1,
                        title: "Ausflüge ab Hurghada",
                        description:
                            "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Online buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                            "Inklusive Versicherung",
                            "Keine Verkaufsveranstaltungen",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 2,
                        title: "DOLPHIN WATCH und Schnorcheln",
                        description: "Erlebe Sie hautnah die faszinierende Welt der Delfine bei einem Schnorchelausflug ab Hurghada",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Kostenlose Stornierung",
                            "Dauer 7 Stunden",
                            "jetzt buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 3,
                        title: "Hurghada Stadtrundfahrt",
                        description: "Entdecken Sie das authentische Hurghada mit travelpro Hurghada stadtrundfahrt Privat",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Deutschsprechender Reiseleiter",
                            "Dauer 4 Stunden",
                            "Abholung von der Lobby Ihres Hotels",
                            "Keine Kaffeefahrt",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 4,
                        title: "Luxor Tagesausflug",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Tal der Könige",
                            "Karnak Tempel",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 5,
                        title: "Schnorcheln im Roten Meer",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Schnorchelausrüstung",
                            "2 Schnorchelstopps",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 6,
                        title: "Kairo und Pyramiden",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Pyramiden von Gizeh",
                            "Ägyptisches Museum",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                ]
                );
                break;
            case 'egypt-roundtrips':
                setPageTitle(t('main_navbar.egypt_roundtrips'));
                setTours([
                    {
                        id: 1,
                        title: "Ausflüge ab Hurghada",
                        description:
                            "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Online buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                            "Inklusive Versicherung",
                            "Keine Verkaufsveranstaltungen",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 2,
                        title: "DOLPHIN WATCH und Schnorcheln",
                        description: "Erlebe Sie hautnah die faszinierende Welt der Delfine bei einem Schnorchelausflug ab Hurghada",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Kostenlose Stornierung",
                            "Dauer 7 Stunden",
                            "jetzt buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 3,
                        title: "Hurghada Stadtrundfahrt",
                        description: "Entdecken Sie das authentische Hurghada mit travelpro Hurghada stadtrundfahrt Privat",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Deutschsprechender Reiseleiter",
                            "Dauer 4 Stunden",
                            "Abholung von der Lobby Ihres Hotels",
                            "Keine Kaffeefahrt",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 4,
                        title: "Luxor Tagesausflug",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Tal der Könige",
                            "Karnak Tempel",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 5,
                        title: "Schnorcheln im Roten Meer",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Schnorchelausrüstung",
                            "2 Schnorchelstopps",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 6,
                        title: "Kairo und Pyramiden",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Pyramiden von Gizeh",
                            "Ägyptisches Museum",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                ]
                );
                break;
            default:
                setTours([
                    {
                        id: 1,
                        title: "Ausflüge ab Hurghada",
                        description:
                            "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Online buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                            "Inklusive Versicherung",
                            "Keine Verkaufsveranstaltungen",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 2,
                        title: "DOLPHIN WATCH und Schnorcheln",
                        description: "Erlebe Sie hautnah die faszinierende Welt der Delfine bei einem Schnorchelausflug ab Hurghada",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Kostenlose Stornierung",
                            "Dauer 7 Stunden",
                            "jetzt buchen und vor Ort bezahlen",
                            "Abholung von der Lobby Ihres Hotels",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 3,
                        title: "Hurghada Stadtrundfahrt",
                        description: "Entdecken Sie das authentische Hurghada mit travelpro Hurghada stadtrundfahrt Privat",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Deutschsprechender Reiseleiter",
                            "Dauer 4 Stunden",
                            "Abholung von der Lobby Ihres Hotels",
                            "Keine Kaffeefahrt",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 4,
                        title: "Luxor Tagesausflug",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/makadi bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Tal der Könige",
                            "Karnak Tempel",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 5,
                        title: "Schnorcheln im Roten Meer",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/el guna.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Schnorchelausrüstung",
                            "2 Schnorchelstopps",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                    {
                        id: 6,
                        title: "Kairo und Pyramiden",
                        description: "Erleben Sie einen unvergesslichen Tagesausflug nach Luxor – privat und ohne Verkaufsveranstaltungen",
                        image: "/images/Cities/soma bay.jpg",
                        features: [
                            "Hotelabholung und Rückfahrt",
                            "Deutschsprachige Reiseleitung",
                            "Mittagessen inklusive",
                            "Pyramiden von Gizeh",
                            "Ägyptisches Museum",
                        ],
                        price: "187",
                        isLiked: false,
                    },
                ]
                );
                break;
        }
    };

    return (
        <section className="tours-section">
            <Container>
                <div className="tours-grid">
                    <Row>
                        {tours.map((tour) => (
                            <Col key={tour.id} lg={4} md={6} className="d-flex">
                                <TourCard tour={tour} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default DestinationExcursions;