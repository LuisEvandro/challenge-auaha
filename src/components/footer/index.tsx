import Image from 'next/image'
import Link from 'next/link'

import styles from './styles.module.scss'

export default function Footer(){
    return (
        <>
            <div className={styles.footer_content}>
                <div className={'container'}>
                    <div className={styles.footer}>
                        <div className={styles.footer_column}>
                            <p className={styles.footer_column_title}>Contato</p>

                            <div className={styles.footer_column_item}>
                                <Image
                                    width={15}
                                    height={15}
                                    src={'/images/clock.svg'}
                                    alt={'Icone relógio'}
                                    objectFit="contain"
                                />
                                <p><strong>Das 9:00 as 17:00</strong></p>
                            </div>
                            <div className={styles.footer_column_item}>
                                <Image
                                    width={15}
                                    height={15}
                                    src={'/images/whatsapp_icon.svg'}
                                    alt={'Icone relógio'}
                                    objectFit="contain"
                                />
                                <p style={{cursor: 'pointer'}}><strong>(11) 98751-2918</strong></p>
                            </div>
                            <div className={styles.footer_column_item}>
                                <Image
                                    width={15}
                                    height={15}
                                    src={'/images/email_icon.svg'}
                                    alt={'Icone relógio'}
                                    objectFit="contain"
                                />
                                <p
                                    onClick={() => {
                                        window.open("mailto:vendas@surijoias.com.br?subject=Contato", '_self');
                                    }}
                                    style={{cursor: 'pointer'}}
                                >
                                    vendas@surijoias.com.br
                                </p>
                            </div>
                        </div>
                        <div className={styles.footer_column}>
                            <p className={styles.footer_column_title}>Institucional</p>
                            <div className={styles.footer_column_item}>
                                <Link href={'/'}>
                                    <a>Sobre nós</a>
                                </Link>
                            </div>
                            <div className={styles.footer_column_item}>
                                <Link href={'/'}>
                                    <a>Trocas e Devoluções</a>
                                </Link>
                            </div>
                            <div className={styles.footer_column_item}>
                                <Link href={'/'}>
                                    <a>Entregas e Prazos</a>
                                </Link>
                            </div>
                            <div className={styles.footer_column_item}>
                                <Link href={'/'}>
                                    <a>Blog</a>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.footer_column}>
                            <p className={styles.footer_column_title}>Ajuda</p>

                            <div className={styles.footer_column_item}>
                                <Link href={'/'}>
                                    <a>Contato</a>
                                </Link>
                            </div>
                            <div className={styles.footer_column_item}>
                                <Link href={'/'}>
                                    <a>Tire suas dúvidas</a>
                                </Link>
                            </div>
                            <div className={styles.footer_column_item}>
                                <Link href={'/'}>
                                    <a>Garantia e Cuidados</a>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.footer_column}>
                            <p className={styles.footer_column_title}>Pagamento</p>

                            <div className={styles.footer_column_payment_items}>
                                <div className={styles.payment_item}>
                                    <Image 
                                        width={37}
                                        height={25}
                                        src={'/images/payments/Visa.svg'}
                                        objectFit={'contain'}
                                    />
                                </div>
                                <div className={styles.payment_item}>
                                    <Image 
                                        width={37}
                                        height={25}
                                        src={'/images/payments/Mastercard.svg'}
                                        objectFit={'contain'}
                                    />
                                </div>
                                <div className={styles.payment_item}>
                                    <Image 
                                        width={37}
                                        height={25}
                                        src={'/images/payments/Dinners.svg'}
                                        objectFit={'contain'}
                                    />
                                </div>
                                <div className={styles.payment_item}>
                                    <Image 
                                        width={37}
                                        height={25}
                                        src={'/images/payments/American.svg'}
                                        objectFit={'contain'}
                                    />
                                </div>
                                <div className={styles.payment_item}>
                                    <Image 
                                        width={37}
                                        height={25}
                                        src={'/images/payments/Hipercard.svg'}
                                        objectFit={'contain'}
                                    />
                                </div>
                            </div>

                            <div className={styles.footer_column_payment_items}>
                                <div className={styles.payment_item}>
                                    <Image 
                                        width={37}
                                        height={25}
                                        src={'/images/payments/Elo.svg'}
                                        objectFit={'contain'}
                                    />
                                </div>
                                <div className={styles.payment_item}>
                                    <Image 
                                        width={37}
                                        height={25}
                                        src={'/images/payments/Boleto.svg'}
                                        objectFit={'contain'}
                                    />
                                </div>
                                <div className={styles.payment_item}>
                                    <Image 
                                        width={37}
                                        height={25}
                                        src={'/images/payments/Bradesco.svg'}
                                        objectFit={'contain'}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.footer_column}>
                            <p className={styles.footer_column_title}>Siga-nos</p>

                            <div className={styles.footer_social_items}>
                                <div className={styles.social_item}>
                                    <Link href={'https://www.facebook.com/'}>
                                        <a target="_blank">
                                            <Image 
                                                width={37}
                                                height={25}
                                                src={'/images/facebook_icon.svg'}
                                                objectFit={'contain'}
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <div className={styles.social_item}>
                                    <Link href={'https://www.instagram.com/'}>
                                        <a target="_blank">
                                            <Image 
                                                width={37}
                                                height={25}
                                                src={'/images/instagram_icon.svg'}
                                                objectFit={'contain'}
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <div className={styles.social_item}>
                                    <Link href={'https://api.whatsapp.com/send?phone=5514999999999&text=Contato Suri Joias'}>
                                            <a target="_blank">
                                                <Image 
                                                    width={37}
                                                    height={25}
                                                    src={'/images/whatsapp_icon.svg'}
                                                    objectFit={'contain'}
                                                />
                                            </a>
                                        </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.copyright_content}>
                <p className={styles.copyright_text}>
                    © SURI JOIAS. Proibida reprodução total ou parcial. Preços e estoques sujeitos à alteração sem aviso prévio - CNPJ: 00.680.164.0001/07 - R. Exemplo, 00, Bairro Exemplo, Exemplo – EX
                </p>

                <Image
                    width={73}
                    height={24}
                    src={'/images/logo.png'}
                    alt="Auaha logo"
                    objectFit={"contain"}
                />
            </div>
        </>
    )
}