import { apiVersion } from '@/sanity/env';
import { BookIcon, TagsIcon, UserIcon } from '@sanity/icons';

export const pageEventCategory = (S) => {
	return S.listItem()
		.title('Categories')
		.child(S.documentTypeList('pEventCategory').title('Categories'))
		.icon(TagsIcon);
};

export const pageEventAuthor = (S) => {
	return S.listItem()
		.title('Authors')
		.child(S.documentTypeList('gAuthor').title('Authors'))
		.icon(UserIcon);
};

export const pageEvent = (S, context) => {
	return S.listItem()
		.title('Event')
		.child(
			S.list()
				.title('Event')
				.items([
					S.listItem()
						.title('Event Index Page')
						.child(
							S.editor()
								.id('pEventIndex')
								.title('Event Index Page')
								.schemaType('pEventIndex')
								.documentId('pEventIndex')
						)
						.icon(BookIcon),
					S.listItem()
						.title('Events')
						.child(S.documentTypeList('pEvent').title('Events'))
						.icon(BookIcon),
					S.listItem()
						.title('Filters')
						.child(
							S.list()
								.title('Filters')
								.items([
									S.listItem()
										.title('By Category')
										.child(
											S.documentTypeList('pEventCategory')
												.title('Events by Category')
												.child((categoryId) => {
													return S.documentList()
														.title('Events')
														.apiVersion(apiVersion)
														.filter(
															'_type == "pEvent" && $categoryId in category[]._ref'
														)
														.params({ categoryId });
												})
										),
									S.listItem()
										.title('By Author')
										.child(
											S.documentTypeList('gAuthor')
												.title('Events by Author')
												.child((authorId) =>
													S.documentList()
														.title('Events')
														.apiVersion(apiVersion)
														.filter(
															'_type == "pEvent" && $authorId == author._ref'
														)
														.params({ authorId })
												)
										),
								])
						),
					S.divider(),
					pageEventAuthor(S),
					pageEventCategory(S, context),
				])
		)
		.icon(BookIcon);
};
