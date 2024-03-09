import React from 'react';
import styles from "./PageBar.module.scss"
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { DataInform } from '../../../../src/Components/Recoil/Atoms';
import { Toast } from '../../../../src/Utils/Toast';

function PageBar() {

    const pages = [
        {id: 1, path: "/", name: "inspect", icon: "clipboard-data"},
        {id: 2, path: "/filter", name: "filter", icon: "filter"},
        {id: 3, path: "/management", name: "management", icon: "wrench-adjustable-circle"}
    ]

    const navigate = useNavigate()
    const location = useLocation()
    const dataInform = useRecoilValue(DataInform)
    const actPagesBtn = Object.values(dataInform).join("")


    return (
        <div className={styles.pageBarContainer}>
            <div className={styles.pageBar}>
                {pages.map(btn => 
                    <Button 
                        key={btn.id}
                        icon={btn.icon as any}
                        iconWidth="1.8rem"
                        iconHeight="1.8rem"
                        title={btn.name}
                        classNames={{
                            container: styles.pageBtn
                        }}
                        expand='block'
                        color='gray'
                        fill={location.pathname === btn.path ? "basic" : "info"}
                        shape='pill'
                        onClick={() => navigate(btn.path)}
                        // disabled={!actPagesBtn}
                    />   
                )}

            </div>
        </div>
    )
}

export default PageBar;