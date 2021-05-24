import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

const App = () => {
	const [news, setNews] = useState([]);

	useEffect(() => {
		if (!localStorage['deletedStories']) {
			localStorage.setItem('deletedStories', JSON.stringify([]));
		}

		const fetchNews = async () => {
			// You can await here
			const { data } = await axios.get('http://localhost:8000/api/news');
			let filteredNews = data.filter(
				(item) => !JSON.parse(localStorage['deletedStories']).includes(item.id)
			);
			setNews(filteredNews);
		};
		fetchNews();

		// setReadedStories(JSON.parse(localStorage['deletedStories']))

		// let filteredNews = news.filter(
		//   (item) => !JSON.parse(localStorage['deletedStories']).includes(item.id)
		// )
		// setNews(filteredNews)

		console.log('news', news);
		// console.log('readedStories', readedStories)

		// eslint-disable-next-line
	}, []);

	function storage(id) {
		console.log(id);
		let deletedStories = JSON.parse(localStorage['deletedStories']);
		// if (localStorage['deletedStories']) {
		//   deletedStories = JSON.parse(localStorage['deletedStories'])
		// }
		deletedStories.push(id);
		localStorage.setItem('deletedStories', JSON.stringify(deletedStories));
	}

	function filterStories() {
		let filteredNews = news.filter(
			(item) => !JSON.parse(localStorage['deletedStories']).includes(item.id)
		);
		console.log('filteredNews:', filteredNews);
		setNews(filteredNews);
	}

	return (
		<div className="App">
			<div className="head">
				<h1>HN Fesssed</h1>
				<h2>
					We <i className="fas fa-heart red"></i> hacker news!
				</h2>
			</div>
			<div>
				<ul>
					{!news ? (
						<p>Loading please wait...</p>
					) : (
						<ul>
							{news
								.sort((a, b) => b.created_at_order - a.created_at_order)
								.map((newItem) => (
									<li key={newItem.created_at}>
										<a
											target="_blank"
											rel="noreferrer"
											href={newItem.url}
											className="row"
										>
											<p className="title">
												<strong>{newItem.story_title}</strong>
											</p>
											<p className="author">- {newItem.author} -</p>
											<p className="time">
												{moment(newItem.created_at).fromNow()}
											</p>

											<p
												onClick={(e) => {
													e.preventDefault();
													storage(newItem.id);
													filterStories();
												}}
												className="trash"
											>
												<i className="fas fa-trash-alt"></i>
											</p>
										</a>
									</li>
								))}
						</ul>
					)}
				</ul>
			</div>
		</div>
	);
};

export default App;
