import { apiVersion } from '@/sanity/env';
import { BookIcon, TagsIcon, UserIcon } from '@sanity/icons';

export const pageEventCategory = (S) => {
	return S.listItem()
		.title('Categories')
		.child(S.documentTypeList('pEventCategory').title('Categories'))
		.icon(TagsIcon);
};

export const pageEventStatus = (S) => {
	return S.listItem()
		.title('Status')
		.child(S.documentTypeList('pEventStatus').title('Status'))
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
								.id('pEvents')
								.title('Event Index Page')
								.schemaType('pEvents')
								.documentId('pEvents')
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
										.title('By Status')
										.child(
											S.documentTypeList('pEventStatus')
												.title('Events by Status')
												.child((statusId) =>
													S.documentList()
														.title('Events')
														.apiVersion(apiVersion)
														.filter(
															'_type == "pEvent" && $statusId in status[]._ref'
														)
														.params({ statusId })
												)
										),
								])
						),
					S.divider(),
					pageEventStatus(S),
					pageEventCategory(S, context),
				])
		)
		.icon(BookIcon);
};
