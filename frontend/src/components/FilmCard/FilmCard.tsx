import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Film} from "modules/types.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addFilmToHistory, fetchFilms} from "store/slices/filmsSlice.ts";
import {removeFilmFromDraftHistory, updateFilmValue} from "store/slices/historysSlice.ts";

type Props = {
    film: T_Film,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
}

const FilmCard = ({film,  showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.historys)

    const [local_viewed, setLocal_viewed] = useState(film.viewed)
    
    const location = useLocation()

    const isHistoryPage = location.pathname.includes("historys")

    const handeAddToDraftHistory = async () => {
        await dispatch(addFilmToHistory(film.id))
        await dispatch(fetchFilms())
    }

    const handleRemoveFromDraftHistory = async () => {
        await dispatch(removeFilmFromDraftHistory(film.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateFilmValue({
            film_id: film.id,
            viewed: local_viewed
        }))
    }

    if (isHistoryPage) {
        return (
            <Card key={film.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={film.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {film.name}
                            </CardTitle>
                            <CardText>
                                Продолжительность: {film.time} мин.
                            </CardText>
                            <CustomInput label="Просмотрено" type="number" value={local_viewed} setValue={setLocal_viewed} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/films/${film.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftHistory}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={film.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={film.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {film.name}
                </CardTitle>
                <CardText>
                    Продолжительность: {film.time} мин.
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/films/${film.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftHistory}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default FilmCard