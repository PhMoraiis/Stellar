"use client";

import { getCalApi } from "@calcom/embed-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const sitePlans = [
	{
		name: "Landing Page",
		oldPrice: "R$ 1.999,90",
		price: "R$ 1.799,90",
		recurrence: "Pagamento único · Entrega em 7-10 dias",
		badge: "✦ Promoção Especial",
		note: "Ideal para profissionais autônomos e negócios locais que ainda não têm presença online.",
		features: [
			"Design personalizado no Figma",
			"1 página responsiva (desktop + mobile)",
			"Seções: hero, serviços, depoimentos e CTA",
			"Formulário de contato funcional",
			"Orientação de hospedagem inclusa",
			"1 rodada de revisões",
		],
	},
	{
		name: "Site Institucional",
		oldPrice: "R$ 3.899,90",
		price: "R$ 3.499,90",
		recurrence: "Pagamento único · Entrega em 14-21 dias",
		note: "Para empresas que querem uma presença digital completa e profissional.",
		featured: true,
		badge: "Mais escolhido",
		features: [
			"Tudo do Pacote 01",
			"Até 5 páginas completas",
			"Blog ou sistema de atualizações",
			"SEO básico configurado",
			"Otimização de performance",
			"2 rodadas de revisões",
		],
	},
	{
		name: "Sistema Web",
		// oldPrice: "R$ 7.500",
		price: "Sob Consulta",
		recurrence: "A partir de R$ 4.999 · Prazo Negociado",
		badge: "✦ Promoção Especial",
		note: "Para negócios com processos que precisam ser digitalizados. Requer discovery call.",
		features: [
			"Sistemas e aplicações web customizadas",
			"Dashboards e painéis administrativos",
			"Integrações de API (pagamentos, CRM...)",
			"Autenticação e gestão de usuários",
			"Design system completo",
			"Suporte pós-entrega por 30 dias",
		],
	},
];

const socialMonthlyPlans = [
	{
		name: "Starter",
		title: "1 Reels/sem",
		oldP1: "R$ 1.049,90",
		p1: "R$ 949,90",
		p3: "A Consultar",
		recurrence: "Contrato mínimo 3 meses",
		badge: "✦ Promoção Especial",
		note: "Ponto de entrada para quem ainda não tem presença ativa nas redes.",
		features: [
			"04 Reels/mês - até 60s cada",
			"04 Artes/mês para feed",
			"Planejamento de conteúdo mensal",
			"Design personalizado por post",
			"Arte de capa para reels",
			"1 revisão por post",
		],
	},
	{
		name: "Essencial",
		title: "2 Reels/sem",
		oldP1: "R$ 1.929,90",
		p1: "R$ 1.749,90",
		p3: "A Consultar",
		recurrence: "Contrato mínimo 3 meses",
		note: "Para negócios que querem consistência e crescimento real nas redes.",
		featured: true,
		badge: "Mais escolhido",
		features: [
			"08 Reels/mês - até 60s cada",
			"06 Artes/mês para feed",
			"Planejamento de conteúdo quinzenal",
			"Identidade visual apurada e coesa",
			"Legenda + Hashtags",
			"Agendamento e publicação incluídos",
			"Arte de capa para reels",
			"Relatório mensal de desempenho",
			"2 revisões por post",
			"Entrega em 48h úteis",
		],
	},
	{
		name: "Crescimento",
		title: "3 Reels/sem",
		oldP1: "R$ 2.939,90",
		p1: "R$ 2.669,90",
		p3: "A Consultar",
		badge: "✦ Promoção Especial",
		recurrence: "Contrato mínimo 3 meses",
		note: "Para quem quer Social Media como canal de aquisição, não só de presença.",
		features: [
			"12 Reels/mês - até 60s cada",
			"10 Artes/mês para feed",
			"Planejamento de conteúdo quinzenal",
			"Design system completo e coeso",
			"Copywriting avançado em cada post",
			"Agendamento e publicação incluídos",
			"Arte de capa para reels",
			"Relatório quinzenal de desempenho",
			"Relatório quinzenal de alcance",
			"Revisões ilimitadas (ciclo 48h)",
			"Entrega em 48h úteis",
		],
	},
];

const buildInstagramLink = (message: string) =>
	`https://ig.me/m/stellarstudio.br?text=${encodeURIComponent(message)}`;

function PlanCard({ plan }: { plan: (typeof sitePlans)[number] }) {
	return (
		<motion.article
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.35 }}
			className={cn("plan-card", plan.featured && "featured")}
		>
			{plan.badge ? (
				<div
					className={cn(
						"plan-badge",
						plan.badge.includes("Promoção Especial")
							? "plan-badge-promo"
							: "plan-badge-featured",
					)}
				>
					{plan.badge}
				</div>
			) : null}
			<div className="plan-card-body">
				<h3 className="plan-name flex gap-2">
					<em className="text-primaryds">✦</em>
					{plan.name}
				</h3>
				<div className="plan-price">
					{"oldPrice" in plan && plan.oldPrice ? (
						<span className="plan-price-old">{plan.oldPrice}</span>
					) : null}
					<div className="plan-price-current-row">
						<span className="plan-price-value">{plan.price}</span>
					</div>
				</div>
				<p className="plan-recurrence">{plan.recurrence}</p>
				<div className="plan-divider" />
				<ul className="plan-features">
					{plan.features.map((feature) => (
						<li key={feature}>
							<span className="feat-check">✦</span>
							{feature}
						</li>
					))}
				</ul>
				<p className="plan-note">{plan.note}</p>
			</div>
			<Button asChild className="plan-cta w-full">
				<a
					href={buildInstagramLink(
						`Ol\u00e1! Tenho interesse no plano ${plan.name} da Stellar Studio.`,
					)}
					target="_blank"
					rel="noopener noreferrer"
				>
					Quero este plano
				</a>
			</Button>
		</motion.article>
	);
}

export default function LandingPage() {
	const [reelsTab, setReelsTab] = useState<
		"gestao" | "reels-avulso" | "artes-avulso"
	>("gestao");

	useEffect(() => {
		(async () => {
			const cal = await getCalApi({ namespace: "30min" });
			cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
		})();
	}, []);

	return (
		<>
			<Header />

			<main>
				<section className="hero">
					<div className="hero-bg-text">STELLAR</div>
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.65 }}
						className="hero-content"
					>
						<h1>
							O digital que o seu negócio
							{""} <em>merece</em>
						</h1>
						<p className="hero-sub">
							Sites, sistemas e gestão de redes sociais para negócios que querem
							uma presença digital à altura do que entregam.
						</p>
						<div className="hero-actions">
							<Button asChild size="lg">
								<a href="#pricing">Conhecer serviços</a>
							</Button>
							<Button variant="outline" asChild size="lg">
								<a
									href="https://ig.me/m/stellarstudio.br"
									target="_blank"
									rel="noopener noreferrer"
								>
									Conversar no Direct <FaInstagram className="text-lg" />
								</a>
							</Button>
						</div>
					</motion.div>

					<motion.a
						href="#pricing"
						className="hero-scroll-cue"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.55, delay: 0.35 }}
					>
						<span className="hero-scroll-cue-badge">Promoção Especial</span>
						<span className="hero-scroll-cue-text">
							Role para ver os pacotes
						</span>
						<span className="hero-scroll-cue-arrow" aria-hidden="true">
							↓
						</span>
					</motion.a>
				</section>

				<section id="pricing" className="section">
					<div className="section-eyebrow">
						<span>O que oferecemos</span>
					</div>
					<h2 className="section-title">
						Pacotes &amp; <em>Preços</em>
					</h2>
					<p className="section-sub">
						Escolha o serviço certo pro momento do seu negócio. Todos incluem
						design personalizado e foco em resultado.
					</p>

					<Tabs defaultValue="sites">
						<TabsList>
							<TabsTrigger value="sites">Sites &amp; Softwares</TabsTrigger>
							<TabsTrigger value="social">Social Media</TabsTrigger>
						</TabsList>

						<TabsContent value="sites">
							<div className="plans-grid">
								{sitePlans.map((plan) => (
									<PlanCard key={plan.name} plan={plan} />
								))}
							</div>
						</TabsContent>

						<TabsContent value="social" id="social-media">
							<div className="reels-subnav">
								{[
									["gestao", "Gestão Mensal"],
									["reels-avulso", "Reels Avulsos"],
									["artes-avulso", "Artes Avulsas"],
								].map(([key, label]) => (
									<button
										key={key}
										type="button"
										className={cn(
											"reels-subnav-btn",
											reelsTab === key && "active",
										)}
										onClick={() =>
											setReelsTab(
												key as "gestao" | "reels-avulso" | "artes-avulso",
											)
										}
									>
										{label}
									</button>
								))}
							</div>

							{reelsTab === "gestao" ? (
								<div className="reels-pack-section">
									<div className="reels-packs-grid">
										{socialMonthlyPlans.map((pack) => (
											<article
												key={pack.name}
												className={cn("reel-pack", pack.featured && "featured")}
											>
												{pack.badge ? (
													<div
														className={cn(
															"plan-badge",
															pack.badge.includes("Promoção Especial")
																? "plan-badge-promo"
																: "plan-badge-featured",
														)}
													>
														{pack.badge}
													</div>
												) : null}
												<div className="reel-pack-body">
													<h3 className="plan-name flex gap-2">
														<em className="text-primaryds">✦</em>
														{pack.name}
													</h3>
													<div className="reel-price-row">
														<div className="reel-price-item">
															<span>Só edição</span>
															<div className="reel-price-values">
																{pack.oldP1 ? (
																	<span className="reel-old-price">
																		{pack.oldP1}/mês
																	</span>
																) : null}
																<span className="reel-current-price">
																	{pack.p1}/mês
																</span>
															</div>
														</div>
														<div className="reel-price-item">
															<span>Gravação + Roteiro</span>
															<div className="reel-price-values">
																<span className="reel-current-price">{pack.p3}</span>
															</div>
														</div>
													</div>
													<p className="plan-recurrence">{pack.recurrence}</p>
													<ul className="reel-pack-features">
														{pack.features.map((item) => (
															<li key={item}>
																<span className="text-primaryds">✦</span>
																{item}
															</li>
														))}
													</ul>
													<p className="plan-note">{pack.note}</p>
												</div>
												<Button asChild className="plan-cta w-full">
													<a
														href={buildInstagramLink(
															`Ol\u00e1! Tenho interesse no plano ${pack.name} de Social Media da Stellar Studio.`,
														)}
														target="_blank"
														rel="noopener noreferrer"
													>
														Quero este plano
													</a>
												</Button>
											</article>
										))}
									</div>
								</div>
							) : null}

							{reelsTab === "reels-avulso" ? (
								<div className="avulso-table-wrap">
									<div className="avulso-table-header">
										<h3>Reels Unitários</h3>
										<p>
											Preço por Reel conforme modalidade e minutagem. Toda
											edição inclui corte, legenda animada, trilha licenciada e
											arte de capa.
										</p>
									</div>
									<div className="avulso-table-scroll" role="region" aria-label="Tabela de preços de reels unitários">
										<table className="avulso-table">
											<thead>
												<tr>
													<th>Modalidade</th>
													<th>Até 30s</th>
													<th>30s - 60s</th>
													<th>60s - 90s</th>
													<th>+90s</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Apenas Edição</td>
													<td>R$ 120</td>
													<td>R$ 180</td>
													<td>R$ 250</td>
													<td>A consultar</td>
												</tr>
												<tr className="avulso-row-featured">
													<td>Pacote Completo</td>
													<td>R$ 400</td>
													<td>R$ 550</td>
													<td>R$ 700</td>
													<td>A consultar</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className="avulso-notes">
										<div className="avulso-notes-header">
											<h4>
												<em className="text-primaryds">✦</em> O que está
												incluído em cada modalidade
											</h4>
											<p>Entenda melhor o que faz cada serviço diferente</p>
										</div>
										<div className="avulso-notes-grid">
											<div className="avulso-notes-col">
												<h5>Apenas Edição</h5>
												<ul>
													<li>Material fornecido pelo cliente</li>
													<li>Corte e transições profissionais</li>
													<li>Legenda animada com timing</li>
													<li>Trilha licenciada (banco de áudio)</li>
													<li>Arte de capa para reels</li>
												</ul>
											</div>
											<div className="avulso-notes-col">
												<h5>Pacote Completo</h5>
												<ul>
													<li>Tudo do "Apenas Edição"</li>
													<li>Deslocamento dentro de Brasília-DF</li>
													<li>Locação de espaço (por conta do cliente)</li>
													<li>Até 2h de captação por dia</li>
													<li>
														Equipamento básico incluído (celular + ring light)
													</li>
												</ul>
											</div>
											<div className="avulso-notes-col">
												<h5>Adicionais e Especiais</h5>
												<ul>
													<li>Acima de 2h de captação: +R$ 150/hora</li>
													<li>Câmera + iluminação avançada: sob consulta</li>
													<li>Equipamento de drone: sob consulta</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							) : null}

							{reelsTab === "artes-avulso" ? (
								<div className="avulso-table-wrap">
									<div className="avulso-table-header">
										<h3>Artes Estáticas / Carrossel</h3>
										<p>
											Preço por peça conforme modalidade e quantidade de
											slides. Toda entrega inclui design personalizado,
											hierarquia visual e arte pronta para publicação.
										</p>
									</div>
									<div
										className="avulso-table-scroll"
										role="region"
										aria-label="Tabela de preços de artes estáticas e carrossel"
									>
										<table className="avulso-table">
											<thead>
												<tr>
													<th>Modalidade</th>
													<th>Arte Estática</th>
													<th>Carrossel 3-5 slides</th>
													<th>Carrossel 6-8 slides</th>
													<th>9+ slides</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Apenas Design</td>
													<td>R$ 60</td>
													<td>R$ 140</td>
													<td>R$ 210</td>
													<td>A consultar</td>
												</tr>
												<tr className="avulso-row-featured">
													<td>Pacote Completo</td>
													<td>R$ 140</td>
													<td>R$ 260</td>
													<td>R$ 360</td>
													<td>A consultar</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className="avulso-notes">
										<div className="avulso-notes-header">
											<h4>
												<em className="text-primaryds">✦</em> O que está
												incluído em cada modalidade
											</h4>
											<p>Entenda melhor a composição de cada entrega</p>
										</div>
										<div className="avulso-notes-grid2">
											<div className="avulso-notes-col">
												<h5>Apenas Design</h5>
												<ul>
													<li>Layout visual profissional</li>
													<li>Composição para feed</li>
													<li>Entrega em alta qualidade</li>
													<li>1 revisão por peça</li>
												</ul>
											</div>
											<div className="avulso-notes-col">
												<h5>Pacote Completo</h5>
												<ul>
													<li>Copywriting avançado</li>
													<li>Direcionamento criativo por tema</li>
													<li>Sequência narrativa para carrossel</li>
													<li>Guia de publicação e horário</li>
													<li>Até 2 revisões por peça</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							) : null}
						</TabsContent>
					</Tabs>
				</section>

				<FAQ />

				<section className="cta-section bg-[#171718]" id="contato">
					<h2 className="cta-title">
						Pronto para
						<br />
						<em>começar?</em>
					</h2>
					<p className="cta-sub">
						Nos conte mais sobre o seu negócio. Definimos juntos o melhor ponto
						de entrada, sem compromisso.
					</p>
					<div className="cta-contacts">
						<Button
							size="lg"
							className="hover:bg-white hover:text-primary"
							data-cal-namespace="30min"
							data-cal-link="stellar-studio/30min"
							data-cal-config='{"layout":"month_view"}'
						>
							Agendar Meet
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="hover:border-primaryds hover:text-primaryds border-white text-white"
						>
							<a
								href="https://ig.me/m/stellarstudio.br"
								target="_blank"
								rel="noreferrer"
							>
								Conversar no Direct <FaInstagram className="text-lg" />
							</a>
						</Button>
					</div>
				</section>
			</main>

			<a
				href="https://www.instagram.com/stellarstudio.br/"
				target="_blank"
				rel="noopener noreferrer"
				className="instagram-float"
				aria-label="Abrir Instagram da Stellar Studio"
				title="Falar com a Stellar no Instagram"
			>
				<FaInstagram className="text-3xl" />
			</a>

			<Footer />
		</>
	);
}
