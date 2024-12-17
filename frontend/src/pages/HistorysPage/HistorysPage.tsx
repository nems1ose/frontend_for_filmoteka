import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    fetchHistorys,
    updateFilters,
    fetchHistoryStatuses
} from "store/slices/historysSlice.ts";
import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.tsx";
import {T_HistorysFilters} from "modules/types.ts";
import HistorysTable from "components/HistorysTable/HistorysTable.tsx";
import {useNavigate} from "react-router-dom";

const HistorysPage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const historys = useAppSelector((state) => state.historys.historys)

    const statusesFromStore = useAppSelector((state) => state.historys.statuses);

    const filters = useAppSelector<T_HistorysFilters>((state) => state.historys.filters)

    const {is_authenticated} = useAppSelector((state) => state.user)

    const [status, setStatus] = useState(filters.status)

    const [dateFormationStart, setDateFormationStart] = useState(filters.date_formation_start)

    const [dateFormationEnd, setDateFormationEnd] = useState(filters.date_formation_end)

    const statusOptions = statusesFromStore
    .filter(status => status !== "Введен" && status !== "Удален")
    .concat("Не указан");

    useEffect(() => {
        dispatch(fetchHistoryStatuses())
    }, []);

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        dispatch(fetchHistorys())
    }, [filters]);

    const applyFilters = async (e) => {
        e.preventDefault()

        const filters:T_HistorysFilters = {
            status: status === "Не указан" ? undefined : status,
            date_formation_start: dateFormationStart,
            date_formation_end: dateFormationEnd
        }

        await dispatch(updateFilters(filters))
    }

    return (
        <Container>
            <Form onSubmit={applyFilters}>
                <Row className="mb-4 d-flex align-items-center">
                    <Col md="2" className="d-flex flex-row gap-3 align-items-center">
                        <label>От</label>
                        <Input type="date" value={dateFormationStart} onChange={(e) => setDateFormationStart(e.target.value)} required/>
                    </Col>
                    <Col md="2" className="d-flex flex-row gap-3 align-items-center">
                        <label>До</label>
                        <Input type="date" value={dateFormationEnd} onChange={(e) => setDateFormationEnd(e.target.value)} required/>
                    </Col>
                    <Col md="3">
                        <CustomDropdown label="Статус" selectedItem={status} setSelectedItem={setStatus} options={statusOptions} />
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button color="primary" type="submit">Применить</Button>
                    </Col>
                </Row>
            </Form>
            {historys.length ? <HistorysTable historys={historys}/> : <h3 className="text-center mt-5">Истории не найдены</h3>}
        </Container>
    )
};

export default HistorysPage